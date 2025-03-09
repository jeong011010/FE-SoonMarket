import styled from "styled-components"
import React from "react";

interface RectangleBackgroundProps {
  children: React.ReactNode;
}

const RectangleBackground: React.FC<RectangleBackgroundProps> = ({ children }) => {
  return (
    <div>
      <Rectangle />
      {children}
    </div>
  )
}

const Rectangle = styled.div`
  background: #86b3ee;
  position: fixed;
  top: -600px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  width: 1000px;
  height: 1000px;
  z-index: -1;
`

export default RectangleBackground;