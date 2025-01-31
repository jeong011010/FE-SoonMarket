import styled from "styled-components";
import PostCard from "../../../components/Post/PostCard";
import { useEffect } from "react";
import { Box } from "@mui/material";
import useGetMyPosts from "../../../api/Post/useGetMyPost";

const MyPost: React.FC = () => {
  const { myPosts, getMyPosts } = useGetMyPosts();
  console.log(myPosts);

  useEffect(() => {
    getMyPosts();
  }, [getMyPosts]);

  return (
    <MyPostContainer>
      {myPosts.length ? (
          <PostContainer>
            {
              myPosts.map((post)=>(
                <PostCard post={post} key={post.postId} />
              ))
            }
          </PostContainer>
        ) : (
          <StatusMessage>
            게시물이 없습니다.
          </StatusMessage>
        )
      }
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

const PostContainer = styled.div`
  margin: 0px 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding-bottom: 70px; /* 하단바 높이보다 조금 더 여유 공간 추가 */
  justify-items: center;
`;

const StatusMessage = styled.p`
  text-align: center;
  color: black;
  font-size: 14px;
  margin-right: auto;
`;


export default MyPost;