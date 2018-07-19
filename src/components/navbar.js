import React from "react"
import NavLink from "react-router-dom/es/NavLink"
import styled from "styled-components"

const Wrapper = styled.div`
  border-bottom: 1px solid #999;
  margin-bottom: 2rem;
  width: 100%;
`

const NavItem = styled(NavLink)`
  text-decoration: none;
  font-size: 2rem;
  color: #222;

  &:not(:first-child) {
    margin-left: 20px;
  }

  &.active {
    border-bottom: 2px solid red;
  }
`

export default () => (
  <Wrapper>
    <NavItem exact to="/">
      Active
    </NavItem>
    <NavItem exact to="/complete">
      Complete
    </NavItem>
  </Wrapper>
)
