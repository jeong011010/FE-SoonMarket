import styled from "styled-components";
import { useEffect } from "react";
import useGetLikePost from "../../api/Post/useGetLikePost";
import WidePostCard from "../../components/Post/WidePostCard";
import { Divider } from "@mui/material";

const LikePage = () => {
  const { likePosts, getLikePost } = useGetLikePost();

  useEffect(() => {
    getLikePost();
  }, [getLikePost]);

  return (
    <LikeContainer>
      <Header>
        <Title>관심 목록</Title>
      </Header>
      <LikeContent>
        {likePosts && likePosts.length > 0 ? (
          likePosts.map((data) => (
            <div key={data.postId}>
              <WidePostCard post={data} />
              <Divider style={{ width: "95%" }} />
            </div>
          ))
        ) : (
          <p>관심 목록이 없습니다.</p>
        )}
      </LikeContent>
    </LikeContainer>
  );
};

const LikeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 전체 화면 높이 */
`;

const Header = styled.div`
  display: flex;
  align-items: center; 
  position: relative; 
  padding: 5px 0;
  border-bottom: solid 1px gray; 
  width: 100%; 
  background-color: white;
  z-index: 10;

  & > button {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Title = styled.div`
  flex-grow: 1;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  padding: 10px;
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


export default LikePage;
