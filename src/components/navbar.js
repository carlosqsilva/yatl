import React from "react"
import NavLink from "react-router-dom/es/NavLink"
import styled from "styled-components"

const Wrapper = styled.div`
  border-bottom: 1px solid #a8a8a8;
  margin-bottom: 2rem;
  display: flex;
  width: 100%;
`

const NavItem = styled(NavLink)`
  text-decoration: none;
  margin-bottom: -2px;
  font-size: 2rem;
  color: #fafafa;
  text-align: center;
  width: 7rem;

  &:not(:first-child) {
    margin-left: 10px;
  }

  &.active {
    border-bottom: 3px solid #ff324d;
  }
`

export default () => (
  <Wrapper>
    <NavItem exact to="/">
      Active
    </NavItem>
    <NavItem exact to="/late">
      Late
    </NavItem>
    <NavItem exact to="/done">
      Done
    </NavItem>
  </Wrapper>
)
