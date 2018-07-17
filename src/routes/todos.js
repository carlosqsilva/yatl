import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import Author from "../components/author"
import Loader from "../components/loader"
import Add from "../components/buttons"
import Todos from "../components/Todos"
import { init } from "../store/actions"

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 3rem 1rem 2rem 1rem;
  background: linear-gradient(to bottom, #1f1c2c, #928dab);
  /* background: linear-gradient(to bottom, #4776e6, #8e54e9); */
  /* background: linear-gradient(to bottom, #3f2b96, #fff); */
`

const Title = styled.h1`
  color: #fff;
  line-height: 3rem;
  margin-bottom: 3rem;
`

class TodosContainer extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.init()
    }, 600)
  }

  renderTodos = () => {
    const { category, tasks } = this.props
    return category.map(value => (
      <Todos key={value} header={value} todos={tasks[value]} />
    ))
  }

  render() {
    const { loading } = this.props
    // console.log(this.props.options)
    return (
      <Wrapper>
        <Title>
          Hey Carlos,<br />
          this is your to-do list.
        </Title>
        {loading ? <Loader /> : this.renderTodos()}
        <Author />
        <Add />
      </Wrapper>
    )
  }
}

const state = ({ todos, loading }) => {
  const tasks = todos.reduce((acc, todo) => {
    let key = todo.category
    if (acc[key]) {
      acc[key].push(todo)
    } else {
      acc[key] = [todo]
    }
    return acc
  }, {})

  const category = Object.keys(tasks)

  return {
    tasks,
    category,
    loading
  }
}

const action = {
  init
}

export default connect(
  state,
  action
)(TodosContainer)
