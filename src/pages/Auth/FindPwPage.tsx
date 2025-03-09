import React from "react";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import FindPwEmailForm from "./components/FindPwEmailForm";

const FindPwPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <FindPasswordContainer>
      <Header>
        <BackButton>
          <IconButton onClick={() => navigate("/")}>
            <ArrowBackIcon />
          </IconButton>
        </BackButton>
        <Title>Soon-Market</Title>
      </Header>
      <FormWrapper>
        <FindPwEmailForm />
      </FormWrapper>
    </FindPasswordContainer>
  );
};

// Styled Components
const FindPasswordContainer = styled.div`
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
  position: relative; /* 백 버튼 위치를 위한 상대 위치 지정 */
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

const FormWrapper = styled.div`
  width: 100%;
  max-width: 390px; /* 최대 너비 설정 */
  height: calc(100% - 160px); /* 헤더와 여백을 제외한 높이 설정 */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
`;

export default FindPwPage;