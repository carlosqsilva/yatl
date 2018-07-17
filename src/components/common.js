import React from "react"
// import styled from "styled-components"

export const SVG = ({ children, width, height }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || 24}
    height={height || 24}
  >
    {children}
  </svg>
)
