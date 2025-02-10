import { useCallback, useState } from "react";
import { Chat } from "../../type/chatType";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

type ChatListResponse = {
  chats: Chat[];
};

const useGetChatList = () => {
  const [chatList, setChatList] = useState<ChatListResponse | null>(null);
  const navigate = useNavigate();

  const getChatList = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/chat/rooms");
      setChatList(response.data);
      console.log(chatList);
    } catch (error) {
      console.error("좋아요 게시물 받아오는 중 오류 발생", error);
    }
  }, []);

  return { chatList, getChatList };
}

export default useGetChatList;