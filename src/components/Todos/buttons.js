import React from "react"
import styled from "styled-components"
import { SVG } from "../common"

const Wrapper = styled.button`
  all: unset;
  width: 4rem;
  align-self: stretch;
  transition: all 400ms ease;
  justify-content: center;
  display: flex;
  cursor: pointer;

  &:disabled {
    fill: #999;
    cursor: initial;
  }
`

const WrapperDelete = Wrapper.extend`
  fill: ${props => props.active && "#ff1744"};
`

export const Delete = ({ action, active }) => {
  return (
    <WrapperDelete onClick={action} active={active} disabled={!active}>
      <SVG>
        <path d="M6 21h12V7H6v14zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
      </SVG>
    </WrapperDelete>
  )
}

const WrapperConfirm = Wrapper.extend`
  fill: ${props => props.active && "#00c853"};
`

export const Confirm = ({ action, active }) => {
  return (
    <WrapperConfirm onClick={action} active={active} disabled={!active}>
      <SVG>
        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
      </SVG>
    </WrapperConfirm>
  )
}

const EditButton = styled.button`
  all: unset;
  position: absolute;
  cursor: pointer;
  right: 0;
  width: 3rem;
  height: 3rem;
  z-index: 10;
  fill: #bdbdbd;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    fill: #757575;
  }
`

export const Edit = ({ onClick }) => (
  <EditButton onClick={onClick}>
    <SVG>
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </SVG>
  </EditButton>
)
