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
          images.length > 1 ? (
            <SliderWrapper currentIndex={currentImageIndex}>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image.imageUrl}
                  alt={`게시글 사진 ${index + 1}`}
                  style={{ width: 390, height: 400 }}
                />
              ))}
            </SliderWrapper>
          ) : (
            <img
              src={images[0].imageUrl}
              alt="게시글 사진"
              style={{ width: "100%", height: "100%" }}
            />
          )
        ) : (
          <div style={{ width: "100%", height: "100%" }}>Soon-Market</div>
        )
      }
    </ImageContainer>
  )
}

const ImageContainer = styled.div`
  position: relative;
  width: 390px;
  height: 400px;
  overflow: hidden;
`;

const SliderWrapper = styled.div<{ currentIndex: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ currentIndex }) => `translateX(-${currentIndex * 100}%)`};
`;

export default PostImgBox;