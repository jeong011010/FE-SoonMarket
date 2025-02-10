import { useNavigate } from "react-router-dom";
import axiosInstace from "../axiosInstance";

const useAddChat = () => {
  const navigate = useNavigate();

  const addChat = async (postId: Number) => {
    try {
      await axiosInstace.post(`/posts/${postId}/room`);
      console.log('채팅방 생성 완료');
      navigate('/main');
    } catch (error) {
      console.error("채팅방 생성 중 오류 발생", error);
    }
  }

  return addChat;
}

export default useAddChat;