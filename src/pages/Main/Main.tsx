import React, { useEffect } from "react";
import styled from "styled-components";
import schoolImg from "../../assets/soonchunhyangUniversity.jpg";
import TopBar from "../../components/Layout/TopBar";
import CategoryPost from "./components/CategoryPost";
import useSetNotification from "../../api/Notification/useSetNotification";

const Main: React.FC = () => {
  const {setNotification} = useSetNotification();

  useEffect(() => {
    const requestNotificationPermission = async () => {
      // 로컬 스토리지에서 확인
      const hasRequested = localStorage.getItem("notification_requested");

      if (!hasRequested) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          setNotification(true);
          localStorage.setItem("notification_requested", "true"); // 요청 완료 저장
        } else {
          console.log("알림 권한 거부됨");
        }
      }
    };

    requestNotificationPermission();
  }, [setNotification]);

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
  min-height: 100%;
  width: 100%;
  padding-bottom: 60px;
`;

const Content = styled.div`
  padding-top: 10px;
  flex: 1;
  width: 100%;
  max-width: 430px;
  overflow-y: auto;
  background-color: #f6f6f6;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SchoolImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SchoolImg = styled.img`
  width: 85%;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export default Main;