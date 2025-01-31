import axios from "axios";
import { useNavigate } from "react-router-dom";

const useEditPost = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()

  const editPost = async (postId: Number, postData: any) => {
    try {
      console.log('게시물 수정 시도', postData);
      await axios.put(`${apiUrl}/posts/${postId}`, postData);
      console.log('게시물 수정 완료');
      navigate('/main');
    } catch (error) {
      console.error('게시물 수정 중 오류 발생', error);
    }
  }

  return editPost;
}

export default useEditPost;