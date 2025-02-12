import styled from "styled-components"
import useGetChatRoom from "../../api/Chat/useGetChatRoom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const { id : roomId } = useParams();
  const { chatRoom, getChatRoom, error, loading } = useGetChatRoom();
  const { messages: fetchedMessages, loading: messagesLoading } = useGetChatMsg(roomId || "");
  const { post, getPost } = useGetPost();
  const { getUserInfo } = useGetUserInfo();
  const deleteChat = useDeleteChat();
  const { messages: stompMessages, sendMessage } = useChat(roomId || "");
  const [inputMessage, setInputMessage] = useState("");
  const userId = Number(useSelector((state: RootState) => state.auth.userId));

  const [author, setAuthor] = useState<User | null>(null);
  const [buyer, setBuyer] = useState<User | null>(null);

  useEffect(() => {
    if (roomId) {
      getChatRoom(roomId);
    }
  }, [roomId, getChatRoom]);

  useEffect(() => {
    if (!chatRoom) return;
    if (chatRoom.postId===null) return;
    getPost(chatRoom.postId.toString());
  
    Promise.all([
      getUserInfo(chatRoom.authorId), 
      getUserInfo(chatRoom.buyerId)
    ])
      .then(([authorData, buyerData]) => {
        setAuthor(authorData);
        setBuyer(buyerData);
      })
      .catch((err) => console.error("사용자 정보 가져오기 오류", err));
  }, [chatRoom, getPost, getUserInfo]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const chatMessage = {
      type: MessageType.TALK, // 메시지 타입 (백엔드와 맞춰야 함)
      roomId: roomId || "",
      sender: userId, // 로그인한 사용자 ID (예시)
      message: inputMessage,
      nickname: "익명"// 닉네임 (예시)
    };

    sendMessage(chatMessage);
    setInputMessage("");
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

  console.log(fetchedMessages, stompMessages);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>채팅방 - {roomId}</h1>
      <div style={{ height: "400px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
        {[...fetchedMessages, ...stompMessages].map((msg, index) => (
          <p key={index}>
            <strong>{msg.nickname}:</strong> {msg.message}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="메시지를 입력하세요"
      />
      <button onClick={handleSendMessage}>전송</button>
      <Button onClick={deleteBtnClick}>나가기</Button>
    </div>
  )
}

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: white;
  border: 0px;
`;

export default ChatRoomPage;