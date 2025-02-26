import styled from "styled-components"
import useGetChatRoom from "../../api/Chat/useGetChatRoom";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import useGetPost from "../../api/Post/useGetPost";
import useGetUserInfo from "../../api/Auth/useGetUserInfo";
import { User } from "../../type/userType";
import { MessageType } from "../../type/chatType";
import useChat from "../../api/Chat/useChat";
import useGetChatMsg from "../../api/Chat/useGetChatMsg";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useFileUpload from "../../api/Chat/useFileUpload";
import Header from "./components/Header";
import PostInfo from "./components/PostInfo";
import ChatPopup from "./components/ChatPopup";
import ChatMessage from "./components/ChatMessage";

const ChatRoomPage: React.FC = () => {
  const { id: roomId } = useParams();
  const { chatRoom, getChatRoom, error, loading } = useGetChatRoom();
  const { messages: fetchedMessages } = useGetChatMsg(roomId || "");
  const { post, getPost } = useGetPost();
  const { userInfo, getUserInfo } = useGetUserInfo();
  const { messages: stompMessages, sendMessage } = useChat(roomId || "");
  const [inputMessage, setInputMessage] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  const userId = Number(useSelector((state: RootState) => state.auth.userId));
  const [opponent, setOpponent] = useState<User | null>(null);

  const { fileUpload } = useFileUpload();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (roomId) {
      getChatRoom(roomId);
    }
  }, [roomId, getChatRoom]);

  useEffect(() => {
    if (!chatRoom) return;
    if (chatRoom.postId === null) return;
    console.log(chatRoom.postId);
    getPost(chatRoom.postId.toString());
    getUserInfo(userId);

    console.log(post);
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

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !selectedImage) return;
    if (!userInfo) return;

    let fileUrl = null;
    if (selectedImage && roomId) {
      const formData = new FormData();
      formData.append("file", selectedImage);

      const uploadedUrl = await fileUpload(roomId, formData);
      if (!uploadedUrl) {
        alert("이미지 업로드에 실패했습니다.");
        return;  // 이미지 업로드 실패 시 메시지 전송 안 함
      }

      fileUrl = uploadedUrl; // URL 저장
      setSelectedImage(null);
      setPreviewUrl(null);
    }

    const chatMessage = {
      type: MessageType.TALK,
      roomId: roomId || "",
      senderId: userId,
      message: inputMessage,
      nickname: userInfo.nickname,
      fileUrl, // 🔥 이미지 URL 포함
    };

    sendMessage(chatMessage);
    setInputMessage("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <Header opponentNickname={opponent?.nickname} togglePopup={togglePopup} />
      {chatRoom && <PostInfo postId={chatRoom?.postId.toString()} />}
      <ChatMessage chatContainerRef={chatContainerRef} fetchedMessages={fetchedMessages} stompMessages={stompMessages} userId={userId} opponentNickname={opponent?.nickname} />
      <InputContainer hasImage={!!selectedImage}>
        {selectedImage && (
          <ImagePreviewContainer>
            <PreviewImageWrapper>
              <PreviewImage src={previewUrl || ""} alt="미리보기" />
              <DeleteButton onClick={handleRemoveImage}>
                <CloseIcon fontSize="small" />
              </DeleteButton>
            </PreviewImageWrapper>
          </ImagePreviewContainer>
        )}
        <StyledInputWrapper>
          <IconButton component="label">
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            <ImageIcon />
          </IconButton>
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
        </StyledInputWrapper>
      </InputContainer>
      {showPopup && chatRoom && <ChatPopup opponentNickName={opponent?.nickname || ""} showPopup={showPopup} setShowPopup={setShowPopup} roomId={chatRoom?.roomId} togglePopup={togglePopup} />}
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

const InputContainer = styled.div<{ hasImage: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-top: 1px solid #ccc;
  padding: 10px;
  height: ${({ hasImage }) => (hasImage ? "130px" : "50px")}; /* 이미지 있을 때 높이 확장 */
  transition: height 0.3s ease-in-out;
  position: relative;
  background: white;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  justify-content: flex-start;  /* 왼쪽 정렬 */
  padding: 5px 0;
`;

const PreviewImageWrapper = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  margin: 0 10px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: -5px;
  right: -5px;
  background: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
`;

const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
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