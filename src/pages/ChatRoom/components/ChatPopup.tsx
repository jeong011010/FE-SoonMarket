import styled from "styled-components";
import useDeleteChat from "../../../api/Chat/useDeleteChat";

interface ChatPopupProps {
	opponentNickName: string;
	showPopup: boolean;
	setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
	roomId: string;
	togglePopup: () => void;
}

const ChatPopup: React.FC<ChatPopupProps> = ({ opponentNickName, showPopup, setShowPopup, roomId, togglePopup }) => {
	const deleteChat = useDeleteChat();

	const handleBlockUser = () => {
		alert(`${opponentNickName}님을 차단했습니다.`);
		setShowPopup(false);
	};

	const handleReportUser = () => {
		alert(`${opponentNickName}님을 신고했습니다.`);
		setShowPopup(false);
	};

	const handleLeaveChat = async () => {
		const confirmDelete = window.confirm("정말로 나가시겠습니까?");
		if (confirmDelete && roomId) {
			try {
				await deleteChat(roomId);
				alert("채팅방을 나갔습니다.");
			} catch (error) {
				console.error("채팅방 나가기 실패:", error);
				alert("채팅방 나가기에 실패했습니다.");
			}
		}
	};

	return (
		<PopupOverlay showPopup={showPopup} onClick={togglePopup}>
			<PopupContainer showPopup={showPopup} onClick={(e) => e.stopPropagation()}>
				<PopupButton onClick={handleBlockUser}>차단하기</PopupButton>
				<PopupButton onClick={handleReportUser}>신고하기</PopupButton>
				<PopupButton onClick={handleLeaveChat}>나가기</PopupButton>
			</PopupContainer>
		</PopupOverlay>
	)
}

const PopupOverlay = styled.div<{ showPopup: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  opacity: ${({ showPopup }) => (showPopup ? "1" : "0")};
  pointer-events: ${({ showPopup }) => (showPopup ? "auto" : "none")};
  transition: opacity 0.3s ease-in-out;
`;

const PopupContainer = styled.div<{ showPopup: boolean }>`
  background: white;
  max-width: 400px;
  width: 100%;
  padding: 15px;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: 0;
  transform: ${({ showPopup }) => (showPopup ? "translateY(0)" : "translateY(100%)")};
  transition: transform 0.3s ease-in-out;
`;

const PopupButton = styled.button<{ danger?: boolean }>`
  width: 100%;
  padding: 12px;
  border: none;
  background: #f5f5f5;
  color: black;
  font-size: 16px;
  cursor: pointer;
  margin-top: 8px;
`;

export default ChatPopup;