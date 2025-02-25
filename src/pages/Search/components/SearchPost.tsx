import React, { useEffect, useRef, useState } from "react"
import CategoryBtnGroup from "../../../components/Post/CategoryBtnGroup"
import useGetSearchPostList from "../../../api/Post/useGetSearchPostList";
import WidePostCard from "../../../components/Post/WidePostCard";
import { useLocation } from "react-router-dom";
import { Divider } from "@mui/material";
import styled from "styled-components";

const SearchPost: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [page, setPage] = useState<number>(0);
  const { searchPostList, getSearchPostList } = useGetSearchPostList();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("query") || "";
  console.log(searchPostList);

  useEffect(() => {
    setPage(0);
    selectedCategory === "전체" ? getSearchPostList(searchQuery, "", 10, 0) : getSearchPostList(searchQuery, selectedCategory, 10, 0);
  }, [selectedCategory, getSearchPostList, searchQuery]);

  useEffect(() => {
    if (!lastPostRef.current || searchPostList?.last) return;

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    }, { threshold: 1 });

    observerRef.current.observe(lastPostRef.current);

    return () => observerRef.current?.disconnect();
  }, [searchPostList]);

  useEffect(() => {
    if (page > 0) selectedCategory === "전체" ? getSearchPostList(searchQuery, "", 10, page) : getSearchPostList(searchQuery, selectedCategory, 10, page);
  }, [getSearchPostList, selectedCategory, page, searchQuery]);

  return (
    <Content>
      <CategoryBtnGroup selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} width="90%"/>
      {
        searchPostList?.posts.length ? searchPostList?.posts.map((post, index) => (
          <React.Fragment key={post.postId}>
            <WidePostCard post={post} ref={index === searchPostList.posts.length - 1 ? lastPostRef : null} />
            <Divider style={{ width: "95%" }} />
          </React.Fragment>
        )) : (
          <p>해당하는 게시물을 찾을 수 없습니다.</p>
        )
      }
    </Content>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default SearchPost;