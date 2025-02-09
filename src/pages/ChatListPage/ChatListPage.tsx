import styled from "styled-components"
import useGetChatList from "../../api/Chat/useGetChatList";
import React from "react";
import { Divider } from "@mui/material";
import WideChatCard from "./components/WideChatCard";

const ChatListPage: React.FC = () => {
  const {chatList, getChatList } = useGetChatList();

  return (
    <ChatListPageContainer>
      {
        chatList?.chats.length ? chatList.chats.map((chat) => (
          <React.Fragment key={chat.roomId}>
            <WideChatCard chat={chat} />
            <Divider style={{ width: "95%" }} />
          </React.Fragment>
        )) : (
          <>없음</>
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

export default ChatListPage;