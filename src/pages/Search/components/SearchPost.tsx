import React, { useEffect, useState } from "react"
import CategoryBtnGroup from "../../../components/Post/CategoryBtnGroup"
import useGetSearchPostList from "../../../api/Post/useGetSearchPostList";
import WidePostCard from "../../../components/Post/WidePostCard";
import { useLocation } from "react-router-dom";
import { Divider } from "@mui/material";

const SearchPost: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const { searchPostList, getSearchPostList } = useGetSearchPostList();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("query") || "";

  useEffect(() => {
    selectedCategory === "전체" ? getSearchPostList(searchQuery, "", 10, 0) : getSearchPostList(searchQuery, selectedCategory, 10, 0);
  }, [getSearchPostList, selectedCategory, searchQuery]);

  console.log(searchPostList?.posts);

  return (
    <>
      <CategoryBtnGroup selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      {
        searchPostList?.posts.length ? searchPostList?.posts.map((post) => (
          <React.Fragment key={post.postId}>
            <WidePostCard post={post} />
            <Divider style={{ width: "95%" }} />
          </React.Fragment>
        )) : (
          <p>해당하는 게시물을 찾을 수 없습니다.</p>
        )
      }
    </>
  )
}

export default SearchPost;