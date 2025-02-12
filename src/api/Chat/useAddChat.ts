import { useNavigate } from "react-router-dom";
import axiosInstace from "../axiosInstance";

const useAddChat = () => {
  const navigate = useNavigate();

  const addChat = async (postId: Number) => {
    try {
      await axiosInstace.post(`/posts/${postId}/room`);
      console.log('채팅방 생성 완료');
      navigate(`/chat-list`);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        // 서버에서 제공한 에러 메시지 표시
        alert(error.response.data.error);
      } else {
        // 일반적인 에러 메시지 표시
        alert("채팅방 생성 중 알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return addChat;
}

export default useAddChat;