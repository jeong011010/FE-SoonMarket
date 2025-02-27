import React, { useState } from "react";
import styled from "styled-components";
import type { ChatMessage } from "../../../type/chatType";
import ImgEnlarge from "./ImgEnlarge";

interface ChatMessageProps {
  chatContainerRef: React.RefObject<HTMLDivElement>;
  fetchedMessages: ChatMessage[];
  stompMessages: ChatMessage[];
  userId: number;
  opponentNickname: string | undefined;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ chatContainerRef, fetchedMessages, stompMessages, userId, opponentNickname }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseOverlay = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <ChatContainer ref={chatContainerRef}>
        {[...fetchedMessages, ...stompMessages].map((msg, index) => (
          <ChatBubble key={index} isMine={msg.senderId === userId}>
            {msg.senderId !== userId && <Nickname>{opponentNickname}</Nickname>}
            {msg.fileUrl && <ChatImage src={msg.fileUrl} alt="Uploaded" onClick={() => handleImageClick(msg.fileUrl)} />}
            <Message>{msg.message}</Message>
          </ChatBubble>
        ))}
      </ChatContainer>
      {selectedImage && (
        <ImgEnlarge imageUrl={selectedImage} onClose={handleCloseOverlay} />
      )}
    </>
  );
};

const ChatContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
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

const ChatImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  border-radius: 10px;
  margin-bottom: 5px;
  object-fit: cover;
  cursor: pointer;
`;

const ChatBubble = styled.div<{ isMine: boolean }>`
  max-width: 70%;
  padding: 10px;
  margin: 5px 10px;
  border-radius: 15px;
  word-wrap: break-word;
  align-self: ${({ isMine }) => (isMine ? "flex-end" : "flex-start")};
  background-color: ${({ isMine }) => (isMine ? "#007bff" : "#f1f1f1")};
  color: ${({ isMine }) => (isMine ? "white" : "black")};
  display: flex;
  flex-direction: column;
`;

export default ChatMessage;