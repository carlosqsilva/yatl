import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import "./fade.css"
import trash from "./delete.svg"
import { CheckBox } from "./todo"
import { delete_todo } from "../../store/actions"

class Todos extends Component {
  state = {
    completed: []
  }

  onChange = id => event => {
    if (event.target.checked) {
      this.setState(prev => ({
        completed: [id, ...prev.completed]
      }))
    } else {
      this.setState(prev => ({
        completed: prev.completed.filter(i => i !== id)
      }))
    }
  }

  deleteTodos = e => {
    const { completed } = this.state
    setTimeout(() => this.props.deleteTodo(completed), 500)
  }

  render() {
    const { todos, header } = this.props
    const { completed } = this.state

    return (
      <Wrapper>
        <Header>
          <Title>{header}</Title>
          <Status>{`${completed.length}/${todos.length} completed`}</Status>
          <Delete onClick={this.deleteTodos} />
        </Header>
        <TransitionGroup component={null}>
          {todos.map(todo => (
            <CSSTransition key={todo.id} timeout={800} classNames="fade">
              <CheckBox todo={todo} onChange={this.onChange(todo.id)} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Wrapper>
    )
  }
}

const actions = {
  deleteTodo: delete_todo
}

const Wrapper = styled.div`
  padding: 4rem 0.6rem 1rem 0.6rem;
  background-color: #fff;
  margin-bottom: 2rem;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 0 0 0 1rem;
  align-items: center;
  font-size: 1.5rem;
  display: flex;
  color: #101010;
  top: 0;
  left: 0;
  width: 100%;
  height: 3.5rem;
  position: absolute;
`

const Title = styled.h3`
  margin: 0;
`

const Status = styled.span``

const Delete = styled.button`
  all: unset;
  align-self: stretch;
  background-color: #f44336;
  background: url(${trash}) no-repeat center center, #f44336;
  width: 4rem;
`

export default connect(
  null,
  actions
)(Todos)
