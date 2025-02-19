import { useCallback, useState } from "react";
import { Post } from "../../type/postType";
import axiosInstance from "../axiosInstance";

type PostListResponse = {
  posts: Post[];
  last: boolean;
};

const useGetSearchPostList = () => {
  const [searchPostList, setSearchPostList] = useState<PostListResponse | null>(null);

  const getSearchPostList = useCallback(async (keyword: string, category: string, size: number, page: number) => {
    if (page === 0) setSearchPostList(null);

    await axiosInstance.get(`/posts/search`, {
      params: {
        keyword,
        category,
        size,
        page,
      }
    }).then(response => {
      setSearchPostList(prev => ({
        posts: prev === null ? response.data.posts : [...prev.posts, ...response.data.posts],
        last: response.data.last,
      }))
    }).catch(error => console.error("검색 게시글 로드 중 오류 발생", error));
  }, [])

  return { searchPostList, getSearchPostList };
}

export default useGetSearchPostList;