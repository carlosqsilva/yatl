import React from "react"
import styled from "styled-components"
import { SVG } from "../common"

export const Submit = styled.button`
  all: unset;
  background-color: #0d47a1;
  transform: translateY(-50%);
  position: absolute;
  right: 3px;
  top: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  fill: #fff;
  text-align: center;
  cursor: pointer;
`

export default ({ onClick }) => (
  <Submit onClick={onClick}>
    <SVG>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </SVG>
  </Submit>
)
