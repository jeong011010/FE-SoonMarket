import styled from "styled-components";
import useFileUpload from "../../../api/Chat/useFileUpload";
import { useState } from "react";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import { ChatMessage, MessageType } from "../../../type/chatType";
import { User } from "../../../type/userType";

interface ChatInputProps {
	userInfo: User;
	userId: number;
	roomId: string;
	sendMessage: (message: ChatMessage) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ userInfo, userId, roomId, sendMessage }) => {
	const { fileUpload } = useFileUpload();
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [inputMessage, setInputMessage] = useState("");

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

	return (
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
	)
};



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

export default ChatInput;