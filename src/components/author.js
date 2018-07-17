import React from "react"
import styled from "styled-components"

const Author = styled.h4`
  transform: translateX(-50%);
  align-self: center;
  position: absolute;
  color: #212121;
  bottom: 1rem;
  left: 50%;
  margin: 0;

  > a {
    text-decoration: none;
  }
`

export default () => (
  <Author>
    Made with love by <a href="https://carloseng.com">Carlos Silva</a>
  </Author>
)
