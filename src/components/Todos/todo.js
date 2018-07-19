import React from "react"
import styled from "styled-components"
import edit from "./edit.svg"

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
    border: none;
    background: linear-gradient(to right, #00c853, #fff);
    padding-left: 0.2rem;
    content: " ✔";
    height: 100%;
    width: 100%;
  }

  &:checked ~ span {
    padding-left: 2rem;
  }
`

const Text = styled.span`
  transition: all 200ms ease;
  padding: 0 1rem 0 4rem;
  display: inline-block;
  position: relative;
  width: 100%;

  &::before {
    content: "";
    display: flex;
    align-items: center;
    transform: translateY(-50%);
    transition: all 200ms ease;
    border: 2px solid #00c853;
    border-radius: 1rem;
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

const Edit = styled.a`
  /* background: #eee; */
  background-image: url(${edit});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1.5rem;

  transform: translateY(-50%);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  right: 0;
  width: 2.4rem;
  height: 2.4rem;
  z-index: 10;
`
const Wrapper = styled.div`
  position: relative;
  align-items: center;
  display: flex;

  &:not(:last-child) {
    margin-bottom: 1.1rem;
  }
`
export const Todo = ({ todo, onChange, edit }) => (
  <Wrapper>
    <Label>
      <Input onChange={onChange} />
      <Text>{todo.task}</Text>
    </Label>
    <Edit onClick={edit} />
  </Wrapper>
)
