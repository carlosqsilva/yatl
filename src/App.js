import React from "react"
import styled from "styled-components"
import { Route } from "react-router-dom"

import Install from "./components/install"
import Footer from "./components/footer"
import Navbar from "./components/navbar"
import AddTodo from "./components/AddTodo"

import Home from "./routes/home"
import Late from "./routes/late"
import Complete from "./routes/complete"

const App = () => (
  <Wrapper>
    <Container>
      <AddTodo />
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route path="/late" component={Late} />
      <Route path="/done" component={Complete} />
    </Container>
    <Footer>
      <Install />
    </Footer>
  </Wrapper>
)

const Wrapper = styled.div`
  padding: 1rem 1rem 2rem;
  /* background-color: #fff; */
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
  height: 100%;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`

export default App
