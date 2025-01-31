import { useCallback, useState } from "react"
import { Post } from "../../type/postType";
import axiosInstance from "../axiosInstance";

const useGetRecommendPost = () => {
  const [recommendPosts, setRecommendPosts] = useState<Post[]>([]);

  const getRecommendPosts = useCallback(async () => {

    try {
      const response = await axiosInstance.get<Post[]>(`/posts/random`);
      console.log(response.data);
      setRecommendPosts(response.data);
    } catch (error) {
      console.error("추천 게시물 로드 중 오류 발생", error);
    }
  }, []);


  return { getRecommendPosts, recommendPosts }
}

export default useGetRecommendPost;