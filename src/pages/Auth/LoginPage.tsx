import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <LoginContainer>
      <Header>
        <Title>Soon-Market</Title>
      </Header>
      <LoginForm />
      <Footer>
        <StyledLink to="/findpassword">비밀번호 찾기</StyledLink>ㅣ
        <StyledLink to="/signup">가입하기</StyledLink>
      </Footer>
    </LoginContainer>
  );
};

// Styled Components
const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Header = styled.div`
  position: relative;
  z-index: 1; /* 헤더를 배경 위로 올림 */
  text-align: center;
  margin-top: 50px;
  margin-bottom: 105px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: black;
`;

const Footer = styled.div`
    font-size: 15px;
    color: gray;
    text-align: center;
    margin-top: 20px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    margin: 0 5px;
`;

export default LoginPage;