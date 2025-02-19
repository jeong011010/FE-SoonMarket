import { useEffect, useRef, useState } from "react";
import useGetSearchPostList from "../../../api/Post/useGetSearchPostList";
import CategoryBtnGroup from "../../../components/Post/CategoryBtnGroup";
import styled from "styled-components";
import PostCard from "../../../components/Post/PostCard";

const CategoryPost: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [page, setPage] = useState<number>(0);
  const { searchPostList, getSearchPostList } = useGetSearchPostList();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useRef<HTMLDivElement | null>(null);
  console.log(searchPostList);

  useEffect(() => {
    console.log("카테고리 변경")
    setPage(0);
    selectedCategory === "전체" ? getSearchPostList("", "", 10, 0) : getSearchPostList("", selectedCategory, 10, 0);
  }, [selectedCategory, getSearchPostList]);

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
    if (page > 0) selectedCategory === "전체" ? getSearchPostList("", "", 10, page) : getSearchPostList("", selectedCategory, 10, page);
  }, [getSearchPostList, selectedCategory, page]);

  return (
    <>
      <CategoryGroupWrapper>
        <CategoryBtnGroup selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </CategoryGroupWrapper>
      {
        searchPostList?.posts.length ? (
          <PostContainer>
            {
              searchPostList.posts.map((post, index) => (
                <PostCard post={post} key={index * 3} ref={index === searchPostList.posts.length - 1 ? lastPostRef : null} />
              ))
            }
          </PostContainer>
        ) : (
          <StatusMessage>
            게시물이 없습니다.
          </StatusMessage>
        )
      }
    </>
  )
}

const PostContainer = styled.div`
  margin: 0px 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding-bottom: 70px; /* 하단바 높이보다 조금 더 여유 공간 추가 */
  justify-items: center;
`;

const CategoryGroupWrapper = styled.div`
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  width: 100%;
`;


const StatusMessage = styled.p`
  text-align: center;
  color: black;
  font-size: 14px;
  margin-right: auto;
`;




export default CategoryPost;