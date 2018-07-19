import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import "./fade.css"
import trash from "./delete.svg"
import { Todo } from "./todo"
import { delete_todo, edit_todo } from "../../store/actions"

class TodosContainer extends Component {
  onChange = id => event => {
    if (event.target.checked) {
      this.timeout = setTimeout(() => {
        this.props.action([id])
      }, 5000)
    } else {
      clearTimeout(this.timeout)
    }
  }

  editTodo = todo => event => {
    event.stopPropagation()
    if (event.target === event.currentTarget) {
      this.props.editTodo(todo)
    }
  }

  render() {
    const { todos, header } = this.props

    return (
      <Wrapper>
        <Header>
          <Title>{header}</Title>
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
                edit={this.editTodo(todo)}
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
  deleteTodo: delete_todo
}

const Wrapper = styled.div`
  box-shadow: 0px 2px 5px 1px #757575;
  padding: 4.5rem 0.6rem 1rem 0.6rem;
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

const Header = styled.div`
  justify-content: space-between;
  background-color: #c3c3c3;
  padding: 0 0 0 1rem;
  align-items: center;
  font-size: 1.4rem;
  color: #101010;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 3.5rem;
  position: absolute;
`

const Title = styled.h3`
  margin: 0;
`

// const Delete = styled.button`
//   all: unset;
//   align-self: stretch;
//   background-color: #f44336;
//   background: url(${trash}) no-repeat center center, #f44336;
//   width: 4rem;
// `

export default connect(
  null,
  actions
)(TodosContainer)
