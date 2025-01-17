import { TouchEvent, useState } from "react";
import styled from "styled-components";
import { PostImage } from "../../../type/postType";

// 컴포넌트 Props 타입 정의
interface PostImgBoxProps {
  images: PostImage[];
}

const PostImgBox: React.FC<PostImgBoxProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [touchStartX, setTouchStartX] = useState<number>(0);
  const [touchEndX, setTouchEndX] = useState<number>(0);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      // Next image
      if (images && currentImageIndex < images.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
      }
    } else if (touchStartX - touchEndX < -50) {
      // Previous image
      if (currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1);
      }
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
            <SliderWrapper currentIndex={currentImageIndex}>
              {images.map((image, index) => (
                <Img
                  key={index}
                  src={image.imageUrl}
                  alt={`게시글 사진 ${index + 1}`}
                />
              ))}
            </SliderWrapper>
            <Pagination>
              {images.map((_, index) => (
                <Dot key={index} active={index === currentImageIndex} />
              ))}
            </Pagination>
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
  position: relative;



  &::after {
    content: "";
    position: absolute;
    inset: 0;
    box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.5);
  }

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.3),
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

const SliderWrapper = styled.div<{ currentIndex: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ currentIndex }) => `translateX(-${currentIndex * 100}%)`};
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