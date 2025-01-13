import { useEffect, useState } from "react";
import useGetSearchPostList from "../../../api/Post/useGetSearchPostList";
import CategoryBtnGroup from "../../../components/Post/CategoryBtnGroup";
import styled from "styled-components";
import PostCard from "../../../components/Post/PostCard";

const CategoryPost: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const { searchPostList, getSearchPostList } = useGetSearchPostList();

  useEffect(() => {
    selectedCategory === "전체" ? getSearchPostList("", "", 10, 0) : getSearchPostList("", selectedCategory, 10, 0);
  }, [getSearchPostList, selectedCategory]);

  return (
    <>
    <CategoryGroupWrapper>
      <CategoryBtnGroup selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
    </CategoryGroupWrapper>
      {
        searchPostList?.posts.length ? (
          <PostContainer>
            {
              searchPostList.posts.map((post) => (
                <PostCard post={post} key={post.postId} />
              ))
            }
          </PostContainer>
        ) : (
          <PostContainer>
            게시물이 없습니다.
          </PostContainer>
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



export default CategoryPost;