import styled from "styled-components";
import PostCard from "../../../components/Post/PostCard";
import { useEffect } from "react";
import { Box } from "@mui/material";
import useGetMyPosts from "../../../api/Post/useGetMyPost";
import { Post } from "../../../type/postType";

const MyPost: React.FC = () => {
  const { myPosts, getMyPosts } = useGetMyPosts();
  console.log(myPosts);

  useEffect(() => {
    getMyPosts();
  }, [getMyPosts]);

  return (
    <MyPostContainer>
      {myPosts && myPosts.length > 0 ? (
        myPosts
          .reduce<Post[][]>((rows, _, index) => {
            if (index % 2 === 0) rows.push(myPosts.slice(index, index + 2));
            return rows;
          }, [])
          .map((row, rowIndex) => (
            <Row key={rowIndex}>
              {row.map((post) => (
                <PostCard key={post.postId} post={post} />
              ))}
            </Row>
          ))
      ) : (
        <>
          {myPosts.length === 0 ? (
            <p>작성한 게시글이 없습니다.</p>
          ) : (
            <p>Loading...</p>
          )}
        </>
      )}
    </MyPostContainer>
  );
};

const MyPostContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: white;
  padding-bottom: 60px;
  align-items: center; /* 아이템을 가운데 정렬 */
  overflow-y: auto; /* 상하 스크롤 가능 */
  width: 100%; /* 컨테이너가 부모 요소를 꽉 채우도록 */
  box-sizing: border-box; /* 패딩 포함 크기 계산 */

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Row = styled(Box)`
  display: flex;
  justify-content: center; /* 카드들이 가운데 정렬 */
  flex-wrap: wrap; /* 화면이 작을 때 줄바꿈 허용 */
  gap: 16px; /* 카드 간격 추가 */
  width: 100%; /* 부모 요소 크기를 기준으로 정렬 */
`;

export default MyPost;