import React from "react";
import styled, { keyframes } from "styled-components";

interface ImgEnlargeProps {
  imageUrl: string;
  onClose: () => void;
}

const ImgEnlarge: React.FC<ImgEnlargeProps> = ({ imageUrl, onClose }) => {
  return (
    <ImageOverlay onClick={onClose}>
      <OverlayImage src={imageUrl} alt="Enlarged" />
    </ImageOverlay>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const zoomIn = keyframes`
  from {
    transform: scale(0.8);
  }
  to {
    transform: scale(1);
  }
`;

const ImageOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  animation: ${fadeIn} 0.3s forwards;
`;

const OverlayImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  border-radius: 10px;
  transform: scale(0.8);
  animation: ${zoomIn} 0.3s forwards;
`;

export default ImgEnlarge;