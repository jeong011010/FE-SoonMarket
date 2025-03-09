import { useCallback, useState } from "react";
import { ChatList } from "../../type/chatType";
import axiosInstance from "../axiosInstance";

const useGetChatList = () => {
  const [chatList, setChatList] = useState<ChatList[] | null>([]);

  const getChatList = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/chat/rooms");
      setChatList(response.data);
    } catch (error) {
      console.error("채팅 리스트 받아오는 중 오류 발생", error);
    }
  }, []);

  return { chatList, getChatList };
}

export default useGetChatList;