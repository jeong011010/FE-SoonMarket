import React, { useState } from "react";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import SignUpEmailForm from "./components/SignUpEmailForm";
import SignUpDetailsForm from "./components/SignUpDetailForm";

const SignUpPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0: 이메일 인증, 1: 비밀번호/닉네임
  const navigate = useNavigate();

  const handleNextStep = () => {
    setCurrentStep(1);
  };

  return (
    <SignUpContainer>
      <BackButton>
        <IconButton onClick={() => navigate("/")}>
          <ArrowBackIcon />
        </IconButton>
      </BackButton>
      <Header>
        <Title>Soon-Market</Title>
      </Header>
      <SlideWrapper>
        <SlideContainer currentStep={currentStep}>
          <Slide>
            <SignUpEmailForm onNext={handleNextStep} />
          </Slide>

          <Slide>
            <SignUpDetailsForm />
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
`;

const BackButton = styled.div`
  position: absolute;
  left: 16px;
  top: 16px;
`;

const Header = styled.div`
  position: relative;
  z-index: 1; /* 헤더를 배경 위로 올림 */
  text-align: center;
  margin-top: 50px;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: black;
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

export default SignUpPage;