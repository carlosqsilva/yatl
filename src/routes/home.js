import React, { Component } from "react"
import { connect } from "react-redux"

import Loader from "../components/loader"
import Todos from "../components/Todos"
import { init, to_complete } from "../store/actions"

class TodosContainer extends Component {
  state = {
    redirect: false
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.init()
    }, 1000)
  }

  completed = () => {
    this.setState({
      redirect: true
    })
  }

  renderTodos = () => {
    const { category, tasks, toComplete } = this.props
    return category.map(value => (
      <Todos
        key={value}
        header={value}
        todos={tasks[value]}
        action={toComplete}
      />
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
  toComplete: to_complete,
  init
}

export default connect(
  state,
  action
)(TodosContainer)
