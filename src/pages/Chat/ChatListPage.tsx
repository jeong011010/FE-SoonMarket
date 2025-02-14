import styled from "styled-components"
import useGetChatList from "../../api/Chat/useGetChatList";
import React, { useEffect } from "react";
import { Divider } from "@mui/material";
import WideChatCard from "./components/WideChatCard";
import useGetUserInfo from "../../api/Auth/useGetUserInfo";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ChatListPage: React.FC = () => {
  const {chatList, getChatList } = useGetChatList();
  const { userInfo, getUserInfo } = useGetUserInfo();
  const userId = useSelector((state: RootState) => state.auth.userId);

  useEffect(() => {
    getChatList();
  }, [getChatList]);

  useEffect(() => {
    getUserInfo(userId);
  }, [getUserInfo, userId]);
  console.log(chatList);

  return (
    <ChatListPageContainer>
      <Header>
        <Title>{userInfo?.nickname}님의 채팅</Title>
      </Header>
      {
        chatList ? chatList.map((chat) => (
          <React.Fragment key={chat.roomId}>
            <WideChatCard chatList={chat} />
            <Divider style={{ width: "95%" }} />
          </React.Fragment>
        )) : (
          <>채팅방이 없습니다.</>
        )
      }
    </ChatListPageContainer>
  )
}

const ChatListPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 전체 화면 높이 */
`

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