import axios from "axios";
import { useCookies } from "react-cookie";

const useLikePost = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [cookies] = useCookies(['access_token']);
  const token = cookies.access_token;

  const likePost = async (postId: string | number) => {
    try {
      console.log('게시물 좋아요 시도', postId);
      await axios.put(`${apiUrl}/posts/${postId}/like`, {}, {
        headers: {
          Authorization: `${token}`
        },
      });
      console.log('게시물 좋아요 성공');
    } catch (error) {
      console.error('게시물 좋아요 시도 중 오류 발생', error);
    }
  }

  return likePost;
}

export default useLikePost;