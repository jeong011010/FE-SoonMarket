import axios from "axios";
import { useCallback, useState } from "react";
import { useCookies } from "react-cookie";

type PostImage = {
  imageUrl: string;
  originalName: string;
};

type Post = {
  title: string;
  images: PostImage[];
  postId: number;
  price: number;
  category: string;
  countLike: number;
  openchatUrl: string;
  createAt: string;
  updateAt: string;
  deleteAt: string | null;
};

const useGetMyPosts = () => {
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [cookies] = useCookies(["access_token"]);
  const token = cookies.access_token;

  const getMyPosts = useCallback(async () => {
    const apiUrl = import.meta.env.VITE_API_URL as string;
    if (!token) {
      console.error("Cannot fetch posts without a valid token.");
      return;
    }

    try {
      const response = await axios.get<Post[]>(`${apiUrl}/posts/my-posts`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(response.data);
      setMyPosts(response.data);
      console.log("My posts fetched successfully.");
    } catch (error) {
      console.error("Error fetching my posts:", error);
    }
  }, [token]);

  return { myPosts, getMyPosts };
};

export default useGetMyPosts;