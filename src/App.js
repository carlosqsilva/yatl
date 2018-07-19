import React from "react"
import styled from "styled-components"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { Route, withRouter } from "react-router-dom"

import Author from "./components/author"
import Navbar from "./components/navbar"
import Todos from "./routes/home"
import Complete from "./routes/complete"
import AddTodo from "./components/AddTodo"

const App = ({ location }) => {
  const key = location.pathname.split("/")[1] || "/"

  return (
    <Wrapper>
      <Container>
        <AddTodo />
        <Navbar />
        <TransitionGroup component={null}>
          <CSSTransition key={key} timeout={500} classNames="fade">
            <React.Fragment>
              <Route exact path="/" component={Todos} />
              <Route path="/complete" component={Complete} />
            </React.Fragment>
          </CSSTransition>
        </TransitionGroup>
      </Container>
      <Author />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: linear-gradient(to bottom, #757f9a, #d7dde8);
  padding: 1rem 1rem 2rem 1rem;
  position: relative;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`

const Container = styled.div`
  position: relative;
  max-width: 720px;
  width: 100%;
  /* flex: 1; */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
`

export default withRouter(App)
