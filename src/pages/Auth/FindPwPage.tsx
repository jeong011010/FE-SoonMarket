import React, { useState } from "react";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import FindPwEmailForm from "./components/FindPwEmailForm";
import FindPwDetailForm from "./components/FindPwDetailForm";

const FindPwPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0: 이메일 인증, 1: 비밀번호 재설정
  const navigate = useNavigate();

  const handleNextStep = () => {
    setCurrentStep(1);
  };

  return (
    <SignUpContainer>
      <Header>
        <BackButton>
          <IconButton onClick={() => navigate("/")}>
            <ArrowBackIcon />
          </IconButton>
        </BackButton>
        <Title>Soon-Market</Title>
      </Header>
      <SlideWrapper>
        <SlideContainer currentStep={currentStep}>
          <Slide>
            <FindPwEmailForm onNext={handleNextStep} />
          </Slide>

          <Slide>
            <FindPwDetailForm />
          </Slide>
        </SlideContainer>
      </SlideWrapper>
    </SignUpContainer>
  );
};

// Styled Components
const SignUpContainer = styled.div`
    display: flex;
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
`;

const BackButton = styled.div`
  position: absolute;
  left: 16px;
  top: 16px;
`;

const Title = styled.h1`
    margin: 100px; /* 원하는 margin 값으로 설정 */
    font-family: 'SUIT', sans-serif; /* 폰트 설정 */
`;

const SlideWrapper = styled.div`
  width: 100%;
  max-width: 390px; /* 로그인 페이지와 동일한 최대 너비 */
  height: calc(100% - 160px); /* 헤더와 여백을 제외한 높이 */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
`;

const SlideContainer = styled.div<{ currentStep: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ currentStep }) => `translateX(-${currentStep * 100}%)`};
  width: 200%; /* 두 개의 슬라이드를 포함하므로 200% */
  height: 100%;
`;

const Slide = styled.div`
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default FindPwPage;