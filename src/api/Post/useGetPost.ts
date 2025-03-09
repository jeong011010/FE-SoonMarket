import { useCallback, useState } from "react";
import { Post } from "../../type/postType";
import axiosInstance from "../axiosInstance";

const useGetPost = () => {
  const [post, setPost] = useState<Post | null>(null);

  const getPost = useCallback(async (postId: string | number) => {
    try {
      const response = await axiosInstance.get<Post>(`/posts/${postId}`);
      setPost(response.data);
      return response.data; // ✅ 바로 response.data를 반환
    } catch (error) {
      console.error(error);
      return null; // 에러 시 null 반환 권장
    }
  }, []);


  return { post, getPost };
};

export default useGetPost;