import { useCallback, useState } from "react";
import { Chat } from "../../type/chatType";
import axiosInstance from "../axiosInstance";

type ChatListResponse = {
  chats: Chat[];
};

const useGetChatList = () => {
  const [chatList, setChatList] = useState<ChatListResponse | null>(null);

  const getChatList = useCallback(async (keyword: string, category: string, size: number, page: number) => {
    await axiosInstance.get(`/posts/search`, {
      params: {
        keyword,
        category,
        size,
        page,
      }
    }).then(response => setChatList(response.data))
      .catch(error => console.error("검색 게시글 로드 중 오류 발생", error));
  }, [])

  return { chatList, getChatList };
}

export default useGetChatList;