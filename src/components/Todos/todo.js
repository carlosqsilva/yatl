import React from "react"
import styled from "styled-components"
import { Edit } from "./buttons"

const Input = styled.input.attrs({
  type: "checkbox"
})`
  position: absolute;
  appearance: none;
  outline: none;
  opacity: 0;
  left: 0;
  top: 0;

  &:checked ~ span::before {
    background: linear-gradient(to right, #00c853, #fff);
    padding-left: 0.4rem;
    content: "✔";
    border: none;
    height: 100%;
    width: 100%;
  }

  &:checked ~ span {
    padding-left: 2.5rem;
  }
`

const Text = styled.span`
  user-select: none;
  transition: all 200ms ease;
  padding-left: 4rem;
  display: inline-flex;
  align-items: center;
  position: relative;
  height: 100%;
  width: 100%;

  &::before {
    content: "";
    display: flex;
    align-items: center;
    transform: translateY(-50%);
    transition: all 200ms ease;
    border: 2px solid #00c853;
    border-radius: 0.3rem;
    position: absolute;
    height: 1.6rem;
    width: 1.6rem;
    z-index: -1;
    top: 50%;
    left: 0;
  }
`

const Label = styled.label`
  position: relative;
  font-size: 1.6rem;
  z-index: 1;
  flex: 1;
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  height: 3rem;
`

export const Todo = ({ todo, onChange, edit }) => (
  <Wrapper>
    <Label>
      <Input onChange={onChange} />
      <Text>{todo.task}</Text>
    </Label>
    {edit && <Edit onClick={() => edit(todo)} />}
  </Wrapper>
)
