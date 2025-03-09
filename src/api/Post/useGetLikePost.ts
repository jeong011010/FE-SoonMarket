import { useCallback, useState } from "react";
import { Post } from "../../type/postType";
import axiosInstance from "../axiosInstance";

const useGetLikePost = () => {
  const [likePosts, setLikePosts] = useState<Post[] | null>(null);

  const getLikePost = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/likes");
      setLikePosts(response.data);
    } catch (error) {
      console.error("좋아요 게시물 받아오는 중 오류 발생", error);
    }
  }, []);

  return { likePosts, getLikePost };
};

export default useGetLikePost;