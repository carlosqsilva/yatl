import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"

import Todos from "../components/Todos"
import { delete_todo, to_todos } from "../store/actions"

class Complete extends Component {
  state = {
    checked: []
  }

  deleteTodos = () => {
    this.props.deleteTodos(this.state.checked)
  }

  render() {
    const { category, tasks, toTodos } = this.props

    if (this.props.loading) {
      return <Redirect to="/" />
    }

    return category.map(value => (
      <Todos key={value} header={value} todos={tasks[value]} action={toTodos} />
    ))
  }
}

const state = ({ complete, loading }) => {
  const tasks = complete.reduce((acc, todo) => {
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

const actions = {
  deleteTodos: delete_todo,
  toTodos: to_todos
}

export default connect(
  state,
  actions
)(Complete)
