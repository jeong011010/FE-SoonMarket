import axios from "axios";
import { useCallback, useState } from "react"

const useGetPost = () => {
  const [post, setPost] = useState({});

  const getPost = useCallback(async (postId: number) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.get(`${apiUrl}/posts/${postId}`)
      setPost(response.data);
      console.log(`${postId}번 게시글 데이터 불러오기 성공`, response);
    } catch (error) {
      console.error(error);
    }
  }, [])

  return { post, getPost };
}

export default useGetPost;