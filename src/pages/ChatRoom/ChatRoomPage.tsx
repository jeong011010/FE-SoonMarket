import styled from "styled-components"
import useGetChatRoom from "../../api/Chat/useGetChatRoom";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"; import useGetPost from "../../api/Post/useGetPost";
import useGetUserInfo from "../../api/Auth/useGetUserInfo";
import { User } from "../../type/userType";
import useChat from "../../api/Chat/useChat";
import useGetChatMsg from "../../api/Chat/useGetChatMsg";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Header from "./components/Header";
import PostInfo from "./components/PostInfo";
import ChatPopup from "./components/ChatPopup";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";

const ChatRoomPage: React.FC = () => {
  const { id: roomId } = useParams();
  const { chatRoom, getChatRoom, error, loading } = useGetChatRoom();
  const { messages: fetchedMessages } = useGetChatMsg(roomId || "");
  const { getPost } = useGetPost();
  const { userInfo, getUserInfo } = useGetUserInfo();
  const { messages: stompMessages, sendMessage } = useChat(roomId || "");
  const [showPopup, setShowPopup] = useState(false);
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
    if (chatRoom.postId === null) return;
    getPost(chatRoom.postId.toString());
    getUserInfo(userId);

    const opponentId = chatRoom.authorId === userId ? chatRoom.buyerId : chatRoom.authorId;

    getUserInfo(opponentId).then((user) => {
      setOpponent(user);
    });

  }, [chatRoom, getPost, getUserInfo]);

  useEffect(() => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        const chatContainer = chatContainerRef.current;
        const inputContainerHeight = 50;

        chatContainer.scrollTop = chatContainer.scrollHeight - inputContainerHeight;
      }
    }, 100);
  }, [fetchedMessages, stompMessages]);

  useEffect(() => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        const chatContainer = chatContainerRef.current;
        const inputContainerHeight = 50;

        chatContainer.scrollTop = chatContainer.scrollHeight - inputContainerHeight;
      }
    }, 100);
  }, []);

  const togglePopup = () => {
    if (!showPopup) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <Header opponentNickname={opponent?.nickname} togglePopup={togglePopup} />
      {chatRoom && <PostInfo postId={chatRoom?.postId.toString()} />}
      <ChatMessage chatContainerRef={chatContainerRef} fetchedMessages={fetchedMessages} stompMessages={stompMessages} userId={userId} opponentNickname={opponent?.nickname} />
      {userInfo && <ChatInput userInfo={userInfo} userId={userId} roomId={roomId || ""} sendMessage={sendMessage} />}
      {chatRoom && <ChatPopup opponentNickName={opponent?.nickname || ""} showPopup={showPopup} setShowPopup={setShowPopup} roomId={chatRoom?.roomId} togglePopup={togglePopup} />}
    </Container>
  );
};

export default ChatRoomPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100dvh;
  position: relative;
`;