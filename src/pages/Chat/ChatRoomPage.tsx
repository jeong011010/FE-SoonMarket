import styled from "styled-components"
import useGetChatRoom from "../../api/Chat/useGetChatRoom";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from "@mui/icons-material/Send";
import useGetPost from "../../api/Post/useGetPost";
import useGetUserInfo from "../../api/Auth/useGetUserInfo";
import { User } from "../../type/userType";
import { MessageType } from "../../type/chatType";
import useDeleteChat from "../../api/Chat/useDeleteChat";
import useChat from "../../api/Chat/useChat";
import useGetChatMsg from "../../api/Chat/useGetChatMsg";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";


const ChatRoomPage: React.FC = () => {

  const navigate = useNavigate();
  const { id : roomId } = useParams();
  const { chatRoom, getChatRoom, error, loading } = useGetChatRoom();
  const { messages: fetchedMessages } = useGetChatMsg(roomId || "");
  const { post, getPost } = useGetPost();
  const { userInfo, getUserInfo } = useGetUserInfo();
  const deleteChat = useDeleteChat();
  const { messages: stompMessages, sendMessage } = useChat(roomId || "");
  const [inputMessage, setInputMessage] = useState("");
  
  const userId = Number(useSelector((state: RootState) => state.auth.userId));
  const [opponent, setOpponent] = useState<User | null>(null);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (roomId) {
      getChatRoom(roomId);
    }
  }, [roomId, getChatRoom]);

  useEffect(() => {
    if (!chatRoom) return;
    if (chatRoom.postId===null) return;
    getPost(chatRoom.postId.toString());
    getUserInfo(userId);

    const opponentId = chatRoom.authorId === userId ? chatRoom.buyerId : chatRoom.authorId;
    
    getUserInfo(opponentId).then((user) => {
      setOpponent(user);
    });

  }, [chatRoom, getPost, getUserInfo]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [fetchedMessages, stompMessages]);

  console.log(userId);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    if (!userInfo) return;

    const chatMessage = {
      type: MessageType.TALK, // 메시지 타입 (백엔드와 맞춰야 함)
      roomId: roomId || "",
      senderId: userId, // 로그인한 사용자 ID (예시)
      message: inputMessage,
      nickname: userInfo.nickname,
    };

    sendMessage(chatMessage);
    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const deleteBtnClick = async () => {
    const confirmDelete = window.confirm("정말로 나가시겠습니까?");
    if (confirmDelete && chatRoom) {
      try {
        await deleteChat(chatRoom.roomId);
        alert("채팅방을 나갔습니다.");
      } catch (error) {
        console.error("채팅방 나가기 실패:", error);
        alert("채팅방 나가기에 실패했습니다.");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  console.log(fetchedMessages);

  return (
    <Container>
      <Header>
        <IconButton color="default" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
      </Header>
      <ChatContainer ref={chatContainerRef}>
        {[...fetchedMessages, ...stompMessages].map((msg, index) => (
          <ChatBubble key={index} isMine={msg.senderId === userId}>
            {msg.senderId !== userId && <Nickname>{opponent?.nickname}</Nickname>}
            <Message>{msg.message}</Message>
          </ChatBubble>
        ))}
      </ChatContainer>
      <InputContainer>
        <StyledInput
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="메시지를 입력하세요"
        />
        <SendButton onClick={handleSendMessage}>
          <SendIcon />
        </SendButton>
      </InputContainer>
      <ExitButton onClick={deleteBtnClick}>나가기</ExitButton>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px;
`;

const ChatContainer = styled.div`
  width: 90%;
  height: 400px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const ChatBubble = styled.div<{ isMine: boolean }>`
  max-width: 70%;
  padding: 10px;
  margin: 5px 0;
  border-radius: 15px;
  word-wrap: break-word;
  align-self: ${({ isMine }) => (isMine ? "flex-end" : "flex-start")};
  background-color: ${({ isMine }) => (isMine ? "#007bff" : "#f1f1f1")};
  color: ${({ isMine }) => (isMine ? "white" : "black")};
`;

const Nickname = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: gray;
  margin-bottom: 3px;
`;

const Message = styled.div`
  font-size: 16px;
`;

const InputContainer = styled.div`
  display: flex;
  width: 90%;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  align-items: center;
  padding: 5px;
`;

const StyledInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: none;
  outline: none;
  font-size: 16px;
`;

const SendButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
`;

const ExitButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  background-color: red;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
`;

export default ChatRoomPage;