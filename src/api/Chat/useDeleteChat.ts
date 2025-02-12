import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const useDeleteChat = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()

  const deleteChat = async (roomId: string) => {
    try {
      await axiosInstance.delete(`${apiUrl}/chat/room/${roomId}/leave`);
      navigate('/chat-list');
    } catch (error) {
      console.error('채팅방 나가는 중 오류 발생', error);
    }
  }

  return deleteChat;
}

export default useDeleteChat;