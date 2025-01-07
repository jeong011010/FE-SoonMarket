import styled from "styled-components"
import RecommendCardStack from "./components/RecommendCardStack"

const RecommendPage: React.FC = () => {
  return (
    <RecommendPageContainer>
      <Header>
				<Title>Soon-Market</Title>
			</Header>
      <RecommendCardStack/>
    </RecommendPageContainer>
  )
}

const RecommendPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 150px;
`

const Header = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    margin: 100px; /* 원하는 margin 값으로 설정 */
    font-family: 'SUIT', sans-serif; /* 폰트 설정 */
`;

export default RecommendPage;