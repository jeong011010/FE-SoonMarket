import React from "react";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import AboutDevelopers from "./components/AboutDevelopers";

const Introduction: React.FC = () => {
    const navigate = useNavigate();

    return (
        <IntroductionContainer>
            <Header>
                <BackButton>
                    <IconButton onClick={() => navigate("/mypage")}>
                        <ArrowBackIcon />
                    </IconButton>
                </BackButton>
                <Title>Soon-Market</Title>
                <UnderLine />
            </Header>
            <FormWrapper>
                <AboutDevelopers />
            </FormWrapper>
        </IntroductionContainer>
    );
};

// Styled Components
const IntroductionContainer = styled.div`
    background-color: rgb(76, 109, 142); /* 파란색 배경 */
    height: 100vh; /* 화면 전체 높이 */
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-bottom: 0px;
    background-color: white;
`;

const BackButton = styled.div`
  position: absolute;
  left: 16px;
  top: 16px;
`;

const Title = styled.h1`
  margin-top: 80px; /* 원하는 margin 값으로 설정 */
  margin-bottom: 40px;
  font-family: 'SUIT', sans-serif; /* 폰트 설정 */
  font-size: 37px;
`;

const UnderLine = styled.div`
  width: 100%;
  height: 5px; /* 선의 두께 */
  background-color: #D9E9F9;
  margin-bottom: 0px;
`;

const FormWrapper = styled.div`
    flex: 1; /* 남은 공간을 차지하도록 설정 */
    display: flex;
    justify-content: center; /* 수직 가운데 정렬 */
    align-items: center; /* 수평 가운데 정렬 */
`;

export default Introduction;
