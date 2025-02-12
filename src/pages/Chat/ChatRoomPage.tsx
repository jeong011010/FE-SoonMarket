import styled from "styled-components"
import useGetChatRoom from "../../api/Chat/useGetChatRoom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetPost from "../../api/Post/useGetPost";
import useGetUserInfo from "../../api/Auth/useGetUserInfo";
import { User } from "../../type/userType";
import useDeleteChat from "../../api/Chat/useDeleteChat";

const ChatRoomPage: React.FC = () => {
  const { id } = useParams();
  const { chatRoom, getChatRoom, error, loading } = useGetChatRoom();
  const { post, getPost } = useGetPost();
  const { getUserInfo } = useGetUserInfo();
  const deleteChat = useDeleteChat();

  const [author, setAuthor] = useState<User | null>(null);
  const [buyer, setBuyer] = useState<User | null>(null);

  useEffect(() => {
    if (id) {
      getChatRoom(id);
    }
  }, [id, getChatRoom]);

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

  return (
    <div>
      <h1>채팅방</h1>
      {chatRoom && (
        <>
          <p>Room ID: {chatRoom.roomId}</p>
          <p>Author: {author?.nickname}</p>
          <p>Buyer: {buyer?.nickname}</p>
          <p>Post Title: {post?.title}</p>
          <p>Post Price: {post?.price}</p>
        </>
      )}
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