import React from "react"

export const SVG = ({ children, width, height }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || "50%"}
    height={height || "50%"}
    viewBox="0 0 24 24"
  >
    {children}
  </svg>
)
