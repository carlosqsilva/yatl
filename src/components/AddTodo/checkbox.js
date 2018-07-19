import React from "react"
import styled from "styled-components"

const Input = styled.input`
  appearance: none;
  outline: none;
  opacity: 0;
  position: absolute;
`

const Label = styled.label`
  transition: all 200ms ease;
  background-color: #c3c3c3;
  border-radius: 4px;
  font-size: 1.4rem;
  padding: 0.6rem;
  color: #212121;
  cursor: pointer;

  margin-right: 0.4rem;
  margin-bottom: 0.4rem;

  ${props =>
    props.checked &&
    `
    color: #e0e0e0;
    background-color: #212121;
  `};
`

export default ({ onChange, color, name, checked }) => (
  <Label checked={checked}>
    <Input
      type="checkbox"
      onChange={onChange}
      checked={checked}
      color={color}
      name={name}
    />
    {name}
  </Label>
)
