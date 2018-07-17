import React from "react"
import styled from "styled-components"
import Link from "react-router-dom/es/Link"
import { SVG } from "./common"

const Wrapper = styled(Link)`
  text-decoration: none;
  outline: none;
  background-color: #0d47a1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: fixed;
  bottom: 30px;
  right: 30px;
  fill: #fff;
  z-index: 10;
`

export default () => (
  <Wrapper to="/add">
    <SVG>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </SVG>
  </Wrapper>
)
