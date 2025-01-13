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
    font-family: 'SUIT', sans-serif;
`;

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