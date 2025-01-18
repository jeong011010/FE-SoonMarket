import { TouchEvent, useState } from "react";
import styled from "styled-components";
import { PostImage } from "../../../type/postType";

// 컴포넌트 Props 타입 정의
interface PostImgBoxProps {
  images: PostImage[];
}

const PostImgBox: React.FC<PostImgBoxProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [startX, setStartX] = useState<number>(0);
  const [dragDistance, setDragDistance] = useState<number>(0); // 드래그 거리
  const resistanceFactor = 5; // 감속 계수

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (images.length > 1) {
      setStartX(e.touches[0].clientX);
      setDragDistance(0); // 초기화
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (images.length > 1) {
      const distance = e.touches[0].clientX - startX;

      // 한계점 감속 효과 적용
      if (
        (currentImageIndex === 0 && distance > 0) || // 첫 이미지에서 왼쪽 드래그
        (currentImageIndex === images.length - 1 && distance < 0) // 마지막 이미지에서 오른쪽 드래그
      ) {
        setDragDistance(distance / resistanceFactor); // 감속 적용
      } else {
        setDragDistance(distance); // 일반 드래그
      }
    }
  };

  const handleTouchEnd = () => {
    const threshold = 50; // 드래그 임계값
    if (dragDistance > threshold && currentImageIndex > 0) {
      // 이전 이미지로 이동
      setCurrentImageIndex(currentImageIndex - 1);
    } else if (dragDistance < -threshold && currentImageIndex < images.length - 1) {
      // 다음 이미지로 이동
      setCurrentImageIndex(currentImageIndex + 1);
    }
    setDragDistance(0); // 드래그 거리 초기화
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
              dragDistance={dragDistance} // 드래그 거리 전달
            >
              {images.map((image, index) => (
                <ImgWrapper key={index}>
                  <Img src={image.imageUrl} alt={`게시글 사진 ${index + 1}`} />
                </ImgWrapper>
              ))}
            </SliderWrapper>
            {images.length > 1 && ( // 이미지가 2개 이상일 때만 페이지네이션 표시
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
  aspect-ratio: 1 / 1; /* 1대1 비율 유지 */

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

const ImgWrapper = styled.div`
  aspect-ratio: 1 / 1; /* 1대1 비율 유지 */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f0f0; /* 배경색 추가 */
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