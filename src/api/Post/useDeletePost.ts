import axios from "axios";
import { useNavigate } from "react-router-dom";

const useDeletePost = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()

  const deletePost = async (postId: Number) => {
    try {
      await axios.delete(`${apiUrl}/posts/${postId}`);
      navigate('/main');
    } catch (error) {
      console.error('게시물 삭제 중 오류 발생', error);
    }
  }

  return deletePost;
}

export default useDeletePost;