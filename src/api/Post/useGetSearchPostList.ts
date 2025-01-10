import axios from "axios";
import { useCallback, useState } from "react";
import { Post } from "../../type/postType";

type PostListResponse = {
  posts: Post[];
  last: boolean;
};

const useGetSearchPostList = () => {
  const [searchPostList, setSearchPostList] = useState<PostListResponse | null>(null);

  const getSearchPostList = useCallback(async (keyword: string, category: string, size: number, page: number) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    await axios.get(`${apiUrl}/posts/search`, {
      params: {
        keyword,
        category,
        size,
        page
      }
    }).then(response => setSearchPostList(response.data))
      .catch(error => console.error(error));
  }, [])

  return { searchPostList, getSearchPostList };
}

export default useGetSearchPostList;