import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import Submit from "./submit"
import CheckBox from "./checkbox"
import { update_todo, create_todo } from "../../store/actions"

class AddTodo extends Component {
  static defaultProps = {
    options: ["Studies", "Work", "Home", "Personal", "Other"]
  }

  state = {
    id: "",
    date: "",
    task: "",
    category: ""
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.setState({
        ...this.props.todo
      })
    }
  }

  textChange = event => {
    this.setState({
      task: event.target.value
    })
  }

  categoryChange = event => {
    this.setState({
      category: event.target.name
    })
  }

  submit = event => {
    event.preventDefault()
    const { task, category, id, date } = this.state
    const { updateTodo, createTodo } = this.props

    if (task) {
      if (id) updateTodo({ id, date, task, category })
      else createTodo({ task, category })

      this.setState({
        task: "",
        category: "",
        id: "",
        date: ""
      })
    }
  }

  render() {
    const { task, category } = this.state
    const { options } = this.props

    return (
      <Wrapper>
        <Form onSubmit={this.submit}>
          <TextArea
            value={task}
            onChange={this.textChange}
            placeholder="What you need to do?"
          />
          <Submit onClick={this.submit} />
        </Form>
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
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;
  flex-direction: column;
`

const Form = styled.form`
  position: relative;
  display: flex;
  background-color: #eee;
  padding: 0.3rem;
  border-radius: 2px;
  margin-bottom: 1.4rem;
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const TextArea = styled.input.attrs({
  type: "text"
})`
  all: unset;
  flex: 1;
  outline: none;
  border: none;
  overflow: hidden;
  background-color: transparent;
  font-size: 2rem;
`

const state = ({ todos: { todo } }) => {
  return {
    id: todo.id || "",
    todo: {
      ...todo
    }
  }
}

const actions = {
  updateTodo: update_todo,
  createTodo: create_todo
}

export default connect(
  state,
  actions
)(AddTodo)
