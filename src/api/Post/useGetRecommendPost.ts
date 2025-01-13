import axios from "axios"
import { useCallback, useState } from "react"
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

const useGetRecommendPost = () => {
  const [recommendPosts, setRecommendPosts] = useState<Post[]>([]);
  const [cookies] = useCookies(["access_token"]);
  const token = cookies.access_token;

  const getRecommendPosts = useCallback(async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    
    await axios.get(`${apiUrl}/posts/random`,{
      headers:{
        Authorization: `${token}`,
      },
    })
    .then(response => setRecommendPosts(response.data))
    .catch(error => console.error(error));
    console.log(recommendPosts);
  }, [])
  
  

  return { getRecommendPosts, recommendPosts }
}

export default useGetRecommendPost;