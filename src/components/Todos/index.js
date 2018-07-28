import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import { Todo } from "./todo"
import { Confirm, Delete } from "./buttons"
import { delete_todo, to_complete, edit_todo } from "../../store/actions"

class TodosContainer extends Component {
  state = {
    selected: []
  }

  deleteTodos = () => {
    const { deleteTodo, DBStore } = this.props
    deleteTodo(this.state.selected, DBStore)
    this.setState({
      selected: []
    })
  }

  completeTodos = () => {
    const { completeTodo, header, DBStore } = this.props
    completeTodo(this.state.selected, header, DBStore)
    this.setState({
      selected: []
    })
  }

  onChange = id => event => {
    if (event.target.checked) {
      this.setState(state => ({
        selected: [...state.selected, id]
      }))
    } else {
      this.setState(state => ({
        selected: state.selected.filter(select => select !== id)
      }))
    }
  }

  render() {
    const { todos, header, editTodo } = this.props
    const active = this.state.selected.length !== 0

    return (
      <Wrapper>
        <Header>
          <Title flex>{header}</Title>
          <Confirm action={this.completeTodos} active={active} />
          <Delete action={this.deleteTodos} active={active} />
        </Header>

        <TransitionGroup component={null}>
          {todos.map(todo => (
            <CSSTransition
              key={todo.id}
              timeout={800}
              enter={false}
              classNames="slideRight"
            >
              <Todo
                todo={todo}
                edit={editTodo}
                onChange={this.onChange(todo.id)}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Wrapper>
    )
  }
}

const actions = {
  editTodo: edit_todo,
  deleteTodo: delete_todo,
  completeTodo: to_complete
}

export const Wrapper = styled.div`
  box-shadow: 0px 1px 50px -17px #a0a0a0;
  padding: 4rem 0.6rem 1rem 0.6rem;
  background-color: #fff;
  margin-bottom: 2rem;
  border-radius: 2px;
  position: relative;
  overflow: hidden;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  justify-content: space-between;
  background-color: #c3c3c3;
  padding-left: 1rem;
  align-items: center;
  font-size: 1.2rem;
  color: #101010;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  position: absolute;
`

export const Title = styled.h3`
  margin: 0;
  ${props =>
    props.flex &&
    `
    flex: 1;
  `};
`

export default connect(
  null,
  actions
)(TodosContainer)
