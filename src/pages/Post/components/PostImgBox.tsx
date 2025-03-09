import { TouchEvent, useState } from "react";
import styled from "styled-components";
import { PostImage } from "../../../type/postType";

interface PostImgBoxProps {
  images: PostImage[];
}

const PostImgBox: React.FC<PostImgBoxProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [startX, setStartX] = useState<number>(0);
  const [dragDistance, setDragDistance] = useState<number>(0);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (images.length > 1) {
      setStartX(e.touches[0].clientX);
      setDragDistance(0);
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (images.length > 1) {
      const distance = e.touches[0].clientX - startX;
      const maxDrag = 370;

      if (
        (currentImageIndex === 0 && distance > 0) ||
        (currentImageIndex === images.length - 1 && distance < 0)
      ) {
        setDragDistance(Math.max(Math.min(distance/ 20, 200), -200));
      } else {
        setDragDistance(Math.max(Math.min(distance/ 2, maxDrag), -maxDrag));
      }
    }
  };

  const handleTouchEnd = () => {
    if (images.length > 1) {
      const threshold = 50;
      if (dragDistance > threshold && currentImageIndex > 0) {
        setCurrentImageIndex((prev) => prev - 1);
      } else if (dragDistance < -threshold && currentImageIndex < images.length - 1) {
        setCurrentImageIndex((prev) => prev + 1);
      }
      setDragDistance(0);
    }
  };

  return (
    <ImageContainer
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {
        images && images.length > 0 ? (
          <>
            <SliderWrapper
              currentIndex={currentImageIndex}
              dragDistance={dragDistance}
            >
              {images.map((image, index) => (
                <ImgWrapper key={index}>
                  <Img src={image.imageUrl} alt={`게시글 사진 ${index + 1}`} />
                </ImgWrapper>
              ))}
            </SliderWrapper>
            {images.length > 1 && (
            <Pagination>
              {images.map((_, index) => (
                <Dot key={index} active={index === currentImageIndex} />
              ))}
            </Pagination>
          )}
          </>
        ) : (
          <div style={{ width: "100%", height: "100%" }}>Soon-Market</div>
        )
      }
    </ImageContainer>
  )
}

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  background: #f0f0f0;
  margin: 20px;
  width: 90%;
  max-width: 390px;
  aspect-ratio: 1 / 1;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30px;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.0)
    );
    z-index: 1; 
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #f0f0f0;
  position: relative;
`;

const ImgWrapper = styled.div`
  aspect-ratio: 1 / 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f0f0;
`;

const SliderWrapper = styled.div<{ currentIndex: number; dragDistance: number }>`
  display: flex;
  transition: ${({ dragDistance }) => (dragDistance === 0 ? "transform 0.3s ease-in-out" : "none")};
  transform: ${({ currentIndex, dragDistance }) =>
    `translateX(calc(-${currentIndex * 100}% + ${dragDistance}px))`};
  width: 100%;
  height: 100%;
`;


const Pagination = styled.div`
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 8px;
  z-index: 2;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ active }) => (active ? "white" : "rgba(255, 255, 255, 0.3)")};
  transition: background 0.3s ease;
`;

export default PostImgBox;