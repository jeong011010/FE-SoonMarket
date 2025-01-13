import axios from "axios";
import { useCallback, useState } from "react";
import { Post } from "../../type/postType";

const useGetPost = () => {
  const [post, setPost] = useState<Post | null>(null);

  const getPost = useCallback(async (postId: string) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.get<Post>(`${apiUrl}/posts/${postId}`); // 반환 타입 지정
      setPost(response.data);
      console.log(`${postId}번 게시글 데이터 불러오기 성공`, response);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { post, getPost };
};

export default useGetPost;