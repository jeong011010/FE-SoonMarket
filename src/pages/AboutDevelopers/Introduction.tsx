import React from "react";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import SlideFunction from "./SlidingFunction"

const Introduction: React.FC =() => {
    const navigate= useNavigate();

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
                <SlideFunction/>
            </FormWrapper>
        </IntroductionContainer>
    );
};
//Styled Components
const IntroductionContainer = styled.div`
    dispaly: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'SUIT', sans-serif;
`;

const Header = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`;

const BackButton = styled.div`
  position: absolute;
  left: 16px;
  top: 16px;
`;

const Title = styled.h1`
  margin: 100px; /* 원하는 margin 값으로 설정 */
  margin-bottom: 55px;
  font-family: 'SUIT', sans-serif; /* 폰트 설정 */
  font-size: 37px;
  `;

const UnderLine = styled.div `
    width: 100%;
  height: 5px; /* 선의 두께 */
  background-color: #D9E9F9;
  margin-bottom: 3px;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 390px; 
  height: calc(100% - 160px);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: white;
`;

export default Introduction;