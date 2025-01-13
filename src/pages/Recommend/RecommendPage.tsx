import styled from "styled-components"
import RecommendCardStack from "./components/RecommendCardStack"
import clipImg from "../../assets/clip.png";

const RecommendPage: React.FC = () => {
  return (
    <PageContainer>
      <RectangleBackground />
      <Header>
        <Title>Soon-Market</Title>
      </Header>
      <RopeSVG viewBox="0 0 300 100" preserveAspectRatio="none">
        <path d="M0,50 Q150,100 300,50" />
        <path d="M0,50 Q150,100 300,50" className="diagonal" />
      </RopeSVG>
      <Clip/>
      <RecommendCardStack />
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
  top: -300px;
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

export default RecommendPage;