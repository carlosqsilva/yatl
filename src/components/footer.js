import React from "react"
import styled from "styled-components"
import github from "../assets/github.svg"

const Wrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Author = styled.h4`
  color: #fafafa;
  margin: 0;
`

const Link = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer"
})`
  text-decoration: none;
  color: #ff324d;
`

const Image = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  vertical-align: middle;
`

export default ({ children }) => (
  <Wrapper>
    <Author>
      Made with love by <Link href="https://carloseng.com">Carlos Silva</Link>
    </Author>
    {children}
    <Link href="https://github.com/carlosqsilva/yatl">
      <Image src={github} />
    </Link>
  </Wrapper>
)
