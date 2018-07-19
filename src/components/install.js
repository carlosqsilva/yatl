import React, { Component } from "react"
import styled from "styled-components"

const InstallPWA = styled.button`
  all: unset;
  font-size: 1.2rem;
  font-weight: bold;
  color: #fafafa;
  position: absolute;
  right: 1rem;
  top: 1rem;
  display: ${props => (props.show ? "initial" : "none")};
`

class Install extends Component {
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
      <InstallPWA onClick={this.install} show={this.state.prompt}>
        Add to Homescreen
      </InstallPWA>
    )
  }
}

export default Install
