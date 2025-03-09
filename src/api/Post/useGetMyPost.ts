import { useCallback, useState } from "react";
import { Post } from "../../type/postType";
import axiosInstance from "../axiosInstance";

const useGetMyPosts = () => {
  const [myPosts, setMyPosts] = useState<Post[]>([]);

  const getMyPosts = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/posts/my-posts");
      setMyPosts(response.data);
    } catch (error) {
      console.error("Error fetching my posts:", error);
    }
  }, []);

  return { myPosts, getMyPosts };
};

export default useGetMyPosts;