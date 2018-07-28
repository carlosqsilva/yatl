import React, { Component } from "react"
import { connect } from "react-redux"

import Loader from "../components/loader"
import Todos from "../components/Todos"
import { splitArray } from "../store/utils"

class TodosContainer extends Component {
  renderTodos = () => {
    const { category, tasks } = this.props

    return category.map(value => (
      <Todos key={value} header={value} todos={tasks[value]} DBStore="todos" />
    ))
  }

  render() {
    const { loading } = this.props

    if (loading) {
      return <Loader />
    }

    return this.renderTodos()
  }
}

const state = ({ todos: { todos, loading } }) => {
  const tasks = splitArray(todos)
  const category = Reflect.ownKeys(tasks)

  return {
    tasks,
    category,
    loading
  }
}

export default connect(state)(TodosContainer)
