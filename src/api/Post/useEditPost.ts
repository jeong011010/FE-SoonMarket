import axios from "axios";
import { useNavigate } from "react-router-dom";

const useEditPost = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()

  const editPost = async (postId: Number, postData: any) => {
    try {
      await axios.put(`${apiUrl}/posts/${postId}`, postData);
      navigate(`/post/${postId}`);
    } catch (error) {
      console.error('게시물 수정 중 오류 발생', error);
    }
  }

  return editPost;
}

export default useEditPost;