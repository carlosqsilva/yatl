import React, { PureComponent } from "react"
import styled from "styled-components"

const InstallButton = styled.button`
  all: unset;
  background: #ffd602;
  border-radius: 4px;
  padding: 0 0.4rem;
  cursor: pointer;
  display: ${props => (props.show ? "initial" : "none")};
`

class Install extends PureComponent {
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
      <InstallButton onClick={this.install} show={this.state.prompt}>
        Add to Homescreen
      </InstallButton>
    )
  }
}

export default Install
