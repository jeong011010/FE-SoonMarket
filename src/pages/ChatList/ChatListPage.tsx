import styled from "styled-components"
import useGetChatList from "../../api/Chat/useGetChatList";
import React, { useEffect } from "react";
import { Divider } from "@mui/material";
import useGetUserInfo from "../../api/Auth/useGetUserInfo";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import WideChatCard from "./components/WideChatCard";

const ChatListPage: React.FC = () => {
  const { chatList, getChatList } = useGetChatList();
  const { userInfo, getUserInfo } = useGetUserInfo();
  const userId = useSelector((state: RootState) => state.auth.userId);

  useEffect(() => {
    getChatList();
  }, [getChatList]);

  useEffect(() => {
    getUserInfo(userId);
  }, [getUserInfo, userId]);

  return (
    <ChatListPageContainer>
      <Header>
        <Title>{userInfo?.nickname}님의 채팅</Title>
      </Header>
      <ChatListContainer>
        {chatList ? chatList.map((chat) => (
          <React.Fragment key={chat.roomId}>
            <WideChatCard chatList={chat} />
            <Divider style={{ width: "95%" }} />
          </React.Fragment>
        )) : (
          <>채팅방이 없습니다.</>
        )}
      </ChatListContainer>
    </ChatListPageContainer>
  )
}

const ChatListPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 전체 화면 높이 */
  overflow: hidden; /* 전체 페이지에서 스크롤 방지 */
  margin-bottom: 60px;
`;

const ChatListContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto; /* 상단, 하단 제외하고 스크롤 가능 */
  padding-bottom: 10px; /* 하단 바 여백 확보 */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border-bottom: solid 1px gray;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  padding: 10px;
`;

export default ChatListPage;