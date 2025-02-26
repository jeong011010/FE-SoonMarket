import React from "react";
//import { useEffect } from "react";
import styled from "styled-components";
import schoolImg from "../../assets/soonchunhyangUniversity.jpg";
import TopBar from "../../components/Layout/TopBar";
import CategoryPost from "./components/CategoryPost";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
//import { initializeFirebase, requestFCMToken } from "../../firebase/firebase"; // FirebaseService import

const Main: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  console.log(isAuthenticated);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     // Firebase 초기화
  //     initializeFirebase();

  //     // FCM 토큰 요청
  //     requestFCMToken().then((currentToken) => {
  //       if (currentToken) {
  //         console.log('발급 받은 FCM 토큰:', currentToken);
  //         alert("토큰: " + currentToken);
  //         // 서버에 토큰을 전달하는 로직 추가
  //       } else {
  //         console.log("No registration token available.");
  //       }
  //     });
  //   }
  // }, [isAuthenticated]);

  return (
    <MainPageContainer>
      <TopBar />
      <Content>
        <SchoolImgWrapper>
          <SchoolImg src={schoolImg} alt="학교" />
        </SchoolImgWrapper>
        <CategoryPost />
      </Content>
    </MainPageContainer>
  );
};

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%; /* 컨테이너가 최소 화면 크기를 차지 */
  width: 100%;
  padding-bottom: 60px; /* 하단바 높이만큼 패딩 추가 */
`;

const Content = styled.div`
  padding-top: 10px;
  flex: 1;
  width: 100%;
  max-width: 430px;
  overflow-y: auto; /* 콘텐츠 스크롤 가능 */
  background-color: #f6f6f6;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SchoolImgWrapper = styled.div`
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  width: 100%;
`;

const SchoolImg = styled.img`
  width: 85%; /* 화면 너비의 85% */
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export default Main;
