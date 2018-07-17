import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import styled from "styled-components"
import { init_db, get_user, create_user } from "../store/actions"

import background from "../assets/homebg.svg"
import { Text } from "../components/inputs"

class Home extends Component {
  state = {
    text: "",
    password: "",
    login: false,
    redirect: false
  }

  async componentDidMount() {
    await init_db()
    const user = await this.props.getUser()
    if (user) {
      this.setState({
        redirect: true
      })
    } else {
      this.setState({
        login: true
      })
    }
  }

  onSubmit = e => {
    e.preventDefault()

    const { text, password } = this.state

    if (text.length !== 0) {
      this.props.createUser(text, password).then(() => {
        this.setState({
          redirect: true
        })
      })
    }
  }

  onChange = ({ target: { type, value } }) => {
    this.setState({
      [type]: value
    })
  }

  render() {
    const { text, password, login, redirect } = this.state

    if (redirect) {
      return <Redirect to="/todos" />
    }

    return (
      <Wrapper>
        <Login onSubmit={this.onSubmit} show={login}>
          <Title>
            <span>Welcome to</span>
            <br />Yet another todo
          </Title>

          <Description>
            Don't have an account yet?<br />A new one will be created for you
            then ;)
          </Description>

          <Text
            placeholder="Username"
            onChange={this.onChange}
            value={text}
            required
          />
          <Text
            placeholder="Password"
            onChange={this.onChange}
            value={password}
            type="password"
            required
          />
          <Submit onClick={this.onSubmit}>continue</Submit>
        </Login>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  background: #101010;
  background-image: url(${background});
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const ShowLogin = () => `
  transform: translateY(0);
  opacity: 1;
`

const Login = styled.form`
  transform: translateY(200px);
  transition: all 600ms ease;
  display: flex;
  flex-direction: column;
  margin: auto 20px;
  max-width: 420px;
  color: #fff;
  opacity: 0;

  ${props => props.show && ShowLogin};
`

const Title = styled.h1`
  font-size: 2.1rem;
  > span {
    font-size: 1.4rem;
  }
`

const Description = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  color: #bdbdbd;
  margin-bottom: 4rem;
`

const Submit = styled.button`
  background-color: #29b6f6;
  font-weight: 700;
  cursor: pointer;
  font-size: 20px;
  padding: 15px;
  border: none;
  color: #fff;
`

const actions = {
  getUser: get_user,
  createUser: create_user
}

export default connect(
  null,
  actions
)(Home)
