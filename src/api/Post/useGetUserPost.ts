import { useCallback, useState } from "react";
import { Post } from "../../type/postType";
import axios from "axios";

const useGetUserPosts = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  const getUserPosts = useCallback(async (userId: String) => {
    try {
      const response = await axios.get(`${apiUrl}/posts/your-posts/${userId}`);
      setUserPosts(response.data);
    } catch (error) {
      console.error("Error fetching my posts:", error);
    }
  }, []);

  return { userPosts, getUserPosts };
};

export default useGetUserPosts;