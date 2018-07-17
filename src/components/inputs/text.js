import React from "react"
import styled from "styled-components"

const Label = styled.label`
  transition: all 100ms linear;
  margin-left: 1rem;
  pointer-events: none;
  font-weight: 700;
  font-size: 2rem;
  color: #101010;
  position: absolute;
  left: 0;
  top: -0.4rem;
`

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 2.1rem;
  color: #171717;
  padding-bottom: 1rem;
  padding-left: 1rem;
  border-bottom: 1px solid #757575;
  background-color: transparent;

  &:focus ~ label,
  &:valid ~ label {
    top: -2.4rem;
    color: #454545;
    font-size: 1.2rem;
  }
`

const Wrapper = styled.div`
  margin-bottom: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
`

export default ({ placeholder, type, value, onChange }) => (
  <Wrapper>
    <Input type={type || "text"} onChange={onChange} value={value} required />
    <Label>{placeholder}</Label>
  </Wrapper>
)
