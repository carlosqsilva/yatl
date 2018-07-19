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

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.id !== state.id) {
      return {
        id: nextProps.id,
        task: nextProps.task,
        category: nextProps.category
      }
    } else return null
  }

  state = {
    id: "",
    task: "",
    category: ""
  }

  textChange = event => {
    this.textarea.style.height = ""
    this.textarea.style.height = this.textarea.scrollHeight + "px"
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
    const { task, category, id } = this.state
    const { updateTodo, createTodo } = this.props

    if (task && category) {
      if (id) updateTodo(this.state)
      else createTodo({ task, category })

      this.setState({
        task: "",
        category: "",
        id: ""
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
            rows={1}
            value={task}
            innerRef={e => (this.textarea = e)}
            onChange={this.textChange}
            placeholder="Add tasks here"
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
  background-color: #fff;
  border-radius: 4px;
  padding: 0.6rem 0.6rem 0 0.6rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`

const Form = styled.form`
  position: relative;
  display: block;
  background-color: #eee;
  padding: 0.5rem 2rem 0.5rem 0.5rem;
  border-radius: 20px;
  margin-bottom: 1.4rem;
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const TextArea = styled.textarea`
  resize: none;
  outline: none;
  border: none;
  width: 100%;
  overflow: hidden;
  background-color: transparent;
  font-size: 1.6rem;
  /* line-height: 2rem; */
`

const state = ({ todo }) => {
  const id = todo.id || ""
  const task = todo.task || ""
  const category = todo.category || ""
  return {
    id,
    task,
    category
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
