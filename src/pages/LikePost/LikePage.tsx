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
      {likePosts && likePosts.length > 0 ? (
        likePosts.map((data) => (
          <>
            <WidePostCard key={data.postId} post={data} />
            <Divider style={{ width: "95%" }} />
          </>
        ))
      ) : (
        <p>관심 목록이 없습니다.</p>
      )}
    </LikeContainer>
  );
};

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

const LikeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 60px;
`

export default LikePage;
