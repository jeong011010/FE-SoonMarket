import React, { useState } from "react";
import styled from "styled-components";
import RecommendCardStack from "./components/RecommendCardStack"
import clipImg from "../../assets/clip.png";

const RecommendPage: React.FC = () => {
  const [isHelpVisible, setHelpVisible] = useState(false);

  const toggleHelpPopup = () => {
    setHelpVisible(!isHelpVisible);
  };

  return (
    <PageContainer>
      <RectangleBackground />
      <HelpButton onClick={toggleHelpPopup}>도움말</HelpButton>
      <Header>
        <Title>SWIPE!</Title>
      </Header>
      <RopeSVG viewBox="0 0 300 100" preserveAspectRatio="none">
        <path d="M0,50 Q150,100 300,50" />
        <path d="M0,50 Q150,100 300,50" className="diagonal" />
      </RopeSVG>
      <Clip/>
      <RecommendCardStack />
      <HelpPopup isVisible={isHelpVisible}>
        <HelpButton onClick={toggleHelpPopup}>도움말 닫기</HelpButton>
        <PopupContent top={250}>
          <HelpText>이 페이지는 랜덤으로 추천 상품을 제시합니다.<br/> <b>버튼</b> 을 누르거나 <b>스와이프</b> 하여 <br/>간단하게 상품들을 둘러보세요</HelpText>
        </PopupContent>

        <PopupContent top={400}>
          <HelpText>좋아요 버튼을 누르거나 <br/>오른쪽으로 스와이프 하면<br/><b>관심목록</b> 에 해당 게시글이 추가됩니다</HelpText>
        </PopupContent>
      </HelpPopup>
    </PageContainer>
  )
}

const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  overflow: hidden; /* 페이지를 넘어가는 요소 숨김 */
  background: white;
`;

const Clip = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  margin-top: 125px;
  transform: translateX(-50%);
  width: 30px;
  height: 80px;
  background-image: url(${clipImg});
  background-size: cover;
  background-position: center;
  z-index: 3;
`;

const RopeSVG = styled.svg`
  position: absolute;
  top: 0;
  margin-top: 90px;
  left: 0;
  width: 100%;
  height: 100px;
  z-index: 0;

path {
    fill: none;
    stroke: #c9a679; /* 기본 노끈 색 */
    stroke-width: 6; /* 노끈 두께 */
  }

  /* 대각선 패턴 추가 */
  .diagonal {
    fill: none;
    stroke: #a3865d; /* 대각선의 더 진한 색 */
    stroke-width: 2; /* 대각선 선 두께 */
    stroke-dasharray: 15, 10; /* 대각선 간격과 길이 */
  }
`;

const RectangleBackground = styled.div`
  position: absolute;
  top: -400px;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 800px;
  background: #86b3ee;
  border-radius: 50%;
  z-index: 0; /* 배경이 모든 카드 아래로 배치되도록 설정 */
  overflow: hidden; /* 배경이 화면 밖으로 나가지 않게 설정 */
`;

const Header = styled.div`
  position: relative;
  z-index: 1; /* 헤더를 배경 위로 올림 */
  text-align: center;
  margin-top: 50px;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-family: 'SUIT', sans-serif;
  font-size: 36px;
  font-weight: bold;
  color: white;
`;

const HelpButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: #2575fc;
  color: white;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  z-index: 5;
  transition: background 0.3s;

  &:hover {
    background: #1a5cb7;
  }
`;

const HelpPopup = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;  
  max-width: 430px; /* 최대 크기 제한 */
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  transform: translateY(${(props) => (props.isVisible ? "0" : "-100%")});
  pointer-events: ${(props) => (props.isVisible ? "auto" : "none")}; /* 팝업이 보이지 않을 때 클릭 방지 */
`;

const PopupContent = styled.div<{ top?: number }>`
  position: absolute;
  width: 80%;
  max-width: 400px;
  border-radius: 16px;
  padding: 20px;
  text-align: center;

  top: ${(props) => props.top || 0}px;

  @media (max-width: 400px) {
    top: ${(props) => (props.top ? props.top - 50 : 200)}px; /* 작은 화면에서는 top 값 조정 */
  }

  @media (max-height: 850px) {
    top: ${(props) => (props.top ? props.top - 30 : 220)}px; /* 작은 높이에서는 top 값 조정 */
  }
`;

const HelpText = styled.p`
  font-family: 'SUIT', sans-serif;
  font-size: 17px;
  color: white;
  line-height: 150%;

  @media (max-width: 400px) or (max-height: 850px) {
    font-size: 14px;
  }
`;

export default RecommendPage;