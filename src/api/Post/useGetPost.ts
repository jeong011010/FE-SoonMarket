import { useCallback, useState } from "react";
import { Post } from "../../type/postType";
import axiosInstance from "../axiosInstance";

const useGetPost = () => {
  const [post, setPost] = useState<Post | null>(null);

  const getPost = useCallback(async (postId: string) => {
    try {
      const response = await axiosInstance.get<Post>(`/posts/${postId}`);
      setPost(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { post, getPost };
};

export default useGetPost;