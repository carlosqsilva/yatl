import React from "react"
import styled, { keyframes } from "styled-components"

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const bounce = keyframes`
  0%, 100% {
    transform: scale(0.0);
  }
  50% {
    transform: scale(1.0);
  }
`

const Spinner = styled.div`
  animation: ${spin} 2s linear infinite;
  position: relative;
  width: 45px;
  height: 45px;
  margin: 0 auto;
`

const BubbleOne = styled.div`
  animation: ${bounce} 2s ease-in-out infinite;
  position: absolute;
  top: 0;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  background-color: #4b9cdb;
`

const BubbleTwo = BubbleOne.extend`
  animation-delay: -1s;
  top: auto;
  bottom: 0;
`

export default () => (
  <Spinner>
    <BubbleOne />
    <BubbleTwo />
  </Spinner>
)
