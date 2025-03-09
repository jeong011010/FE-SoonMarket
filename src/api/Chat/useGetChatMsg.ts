import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../axiosInstance";
import { ChatMessage } from "../../type/chatType";

const useGetChatMsg = (roomId: string | null) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ 비동기 함수 분리 (useCallback 사용)
  const fetchMsg = useCallback(async () => {
    if (!roomId) return;
    try {
      const response = await axiosInstance.get<ChatMessage[]>(`/chat/room/${roomId}/messages`); // ✅ 백엔드 API 경로 확인

      setMessages(response.data);
    } catch (err) {
      console.error("채팅 메시지 불러오기 실패:", err);
      setError("채팅 메시지를 불러올 수 없습니다.");
    } finally {
      setLoading(false);
    }
  }, [roomId]);

  // ✅ roomId가 변경될 때마다 메시지 가져오기
  useEffect(() => {
    if (!roomId) return;
    fetchMsg();
  }, [roomId, fetchMsg]);

  return { messages, loading, error, refetch: fetchMsg }; // ✅ refetch 기능 추가
};

export default useGetChatMsg;