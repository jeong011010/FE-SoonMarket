import { useNavigate } from "react-router-dom";
import axiosInstace from "../axiosInstance";

const useAddPost = () => {
  const navigate = useNavigate();

  const addPost = async (formData: FormData) => {
    try {
      console.log('게시물 등록 시도', formData);
      await axiosInstace.post("/posts", formData);
      console.log('게시물 추가 완료');
      navigate('/main');
    } catch (error) {
      console.error("게시물 등록 중 오류 발생", error);
    }
  }

  return addPost;
}

export default useAddPost;