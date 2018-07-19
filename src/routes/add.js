import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import { Text, CheckBox } from "../components/inputs"
import { update_todo, create_todo } from "../store/actions"

class Add extends Component {
  static defaultProps = {
    options: ["Studies", "Work", "Home", "Personal", "Shopping", "Other"]
  }

  state = {
    task: "",
    category: "",
    transition: false
  }

  componentDidMount() {
    const { state } = this.props.location

    if (state) {
      this.todo = state.todo
      const { task, category } = this.todo

      this.setState({
        task: task,
        category: category
      })
    }

    setTimeout(
      () =>
        this.setState({
          transition: true
        }),
      100
    )
  }

  valueChange = event => {
    this.setState({
      task: event.target.value
    })
  }

  categoryChange = event => {
    this.setState({
      category: event.target.name
    })
  }

  closeForm = e => {
    if (e.target === e.currentTarget) {
      this.props.history.goBack()
    }
  }

  onSubmit = e => {
    e.preventDefault()
    const { updateTodo, createTodo, history } = this.props
    const { task, category } = this.state

    if (task && category) {
      if (this.todo) {
        updateTodo({
          ...this.todo,
          category,
          task
        })
        history.goBack()
      } else {
        createTodo({ task, category })
      }
    }
  }

  render() {
    const { task, category, transition } = this.state
    const { options } = this.props

    return (
      <Wrapper show={transition} onClick={this.closeForm}>
        <Form onSubmit={this.onSubmit} show={transition}>
          <Text
            placeholder="what you need to do?"
            onChange={this.valueChange}
            value={task}
          />
          <Container>
            {options.map(option => (
              <CheckBox
                key={option}
                name={option}
                color={option.color}
                onChange={this.categoryChange}
                checked={option === category}
              />
            ))}
          </Container>
        </Form>
        <Button onClick={this.onSubmit}>Salvar</Button>
      </Wrapper>
    )
  }
}

const actions = {
  createTodo: create_todo,
  updateTodo: update_todo
}

const Wrapper = styled.div`
  transition: all 300ms ease;
  background-color: #212121;
  overflow: hidden;
  min-height: 100vh;
  padding: 0 1rem;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Form = styled.form`
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  transition: all 200ms ease;
  background-color: #fff;
  transform: translateY(-100%);
  padding-top: 4rem;
  display: flex;
  flex-direction: column;
  ${props =>
    props.show &&
    `
    transform: translateY(0);
  `};
`

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
`

const Button = styled.button`
  background-color: #00e676;
  align-self: flex-end;
  border-radius: 4px;
  appearance: none;
  font-size: 1.4rem;
  font-weight: bold;
  margin-top: 1rem;
  padding: 0.6rem;
  color: #101010;
  border: none;
  cursor: pointer;
`

export default connect(
  null,
  actions
)(Add)
