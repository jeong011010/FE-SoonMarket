import axios from "axios"
import { useCallback, useState } from "react"
import { useCookies } from "react-cookie";
import { Post } from "../../type/postType";

const useGetRecommendPost = () => {
  const [recommendPosts, setRecommendPosts] = useState<Post[]>([]);
  const [cookies] = useCookies(["access_token"]);
  const token = cookies.access_token;

  const getRecommendPosts = useCallback(async () => {
    const apiUrl = import.meta.env.VITE_API_URL as string;
    if (!token) {
      console.error("Cannot fetch posts without a valid token.");
      return;
    }

    try {
      const response = await axios.get<Post[]>(`${apiUrl}/posts/random`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(response.data);
      setRecommendPosts(response.data);
      console.log("My posts fetched successfully.");
    } catch (error) {
      console.error("Error fetching my posts:", error);
    }
  }, [token]);


  return { getRecommendPosts, recommendPosts }
}

export default useGetRecommendPost;