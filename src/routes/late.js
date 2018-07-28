import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"

import Todos from "../components/Todos"

class Late extends Component {
  render() {
    const { late, loading } = this.props

    if (loading) {
      return <Redirect to="/" />
    }

    return <Todos header="Late Tasks" todos={late} DBStore="late" />
  }
}

const state = ({ todos: { late, loading } }) => ({
  late,
  loading
})

export default connect(state)(Late)
