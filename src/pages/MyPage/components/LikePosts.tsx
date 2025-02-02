import styled from "styled-components";
import { useEffect } from "react";
import { Divider } from "@mui/material";
import useGetLikePost from "../../../api/Post/useGetLikePost";
import WidePostCard from "../../../components/Post/WidePostCard";

const LikePosts = () => {
  const { likePosts, getLikePost } = useGetLikePost();

  useEffect(() => {
    getLikePost();
  }, [getLikePost]);

  return (
    <LikeContainer>
      <LikeContent>
        {
          likePosts && likePosts.length > 0 ? (
            likePosts.map((data) => (
              <LikePost key={data.postId}>
                <WidePostCard post={data} />
                <Divider style={{ width: "95%" }} />
              </LikePost>
            ))
          ) : (
            <p>관심 목록이 없습니다.</p>
          )
        }
      </LikeContent>
    </LikeContainer>
  );
};

const LikeContainer = styled.div`
  height: auto;
`;

const LikeContent = styled.div`
  flex-grow: 1; /* 남은 공간을 모두 차지 */
  overflow-y: auto; /* 스크롤 가능 */
  width: 100%;
  padding-bottom: 60px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const LikePost = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default LikePosts;