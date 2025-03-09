import { useState, useCallback } from "react";
import { Chat } from "../../type/chatType"; // Chat 타입 import
import axiosInstance from "../axiosInstance"; // axios 인스턴스 import

const useGetChatRoom = () => {
  const [chatRoom, setChatRoom] = useState<Chat | null>(null); // 개별 채팅방 정보 상태
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태

  const getChatRoom = useCallback(async (roomId: string) => {
    setLoading(true);
    setError(null); // 에러 초기화
    try {
      const response = await axiosInstance.get(`/chat/room/${roomId}`); // 채팅방 API 요청
      setChatRoom(response.data); // 응답 데이터 상태에 저장
    } catch (error: any) {
      console.error("채팅방 데이터를 불러오는 중 오류 발생:", error);
      setError(error.response?.data?.message || "Unknown error occurred."); // 에러 메시지 저장
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  }, []);

  return { chatRoom, getChatRoom, loading, error }; // 상태와 함수 반환
};

export default useGetChatRoom;