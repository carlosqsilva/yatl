import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { BrowserRouter as Router, Route } from "react-router-dom"

import Todos from "./routes/todos"
import Add from "./routes/add"

const Wrapper = styled.div`
  background-color: #fff;
  position: relative;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`

const InstallPWA = styled.button`
  all: unset;
  display: ${props => (props.show ? "initial" : "none")};
  font-size: 1.2rem;
  font-weight: bold;
  color: #fafafa;
  position: absolute;
  right: 1rem;
  top: 1rem;
`

class App extends Component {
  state = {
    prompt: false
  }

  componentDidMount() {
    this.deferPrompt = null
    window.addEventListener("beforeinstallprompt", event => {
      event.preventDefault()
      this.deferPrompt = event
      this.setState({ prompt: true })
    })
  }

  install = () => {
    this.deferPrompt.prompt()
    this.deferPrompt.userChoice.then(() => {
      this.setState({ prompt: false })
      this.deferPrompt = null
    })
  }

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Wrapper>
          <Route path="/" component={Todos} />
          <Route path="/add" component={Add} />
          <InstallPWA onClick={this.install} show={this.state.prompt}>
            Add to Homescreen
          </InstallPWA>
        </Wrapper>
      </Router>
    )
  }
}

export default connect(null)(App)
