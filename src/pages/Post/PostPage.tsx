import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect } from "react";
import useGetPost from "../../api/Post/useGetPost";
import PostImgBox from "./components/PostImgBox";
import PostMaster from "./components/PostMaster";
import PostContent from "./components/PostContent";
import BottomBar from "./components/BottomBar";

const PostPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { post, getPost } = useGetPost();

  useEffect(() => {
    if (id) {
      getPost(id);
    }
  }, [getPost, id]);

  useEffect(() => {
    if (post?.like !== null) {
    }
  }, [post]);

  return (
    <PageContainer>
      <Header>
        <IconButton color="default" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>

        <Dot/>
      </Header>
      <ContentContainer>
        {post?.images && <PostImgBox images={post.images} />}
        <PostContentWrapper>
          {post && post.like !== null && <PostMaster postId={post.postId} userId={post.userId} like={post.like} />}
          {post && <PostContent post={post} />}
        </PostContentWrapper>
      </ContentContainer>
      {post && <BottomBar price={post?.price} />}
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100dvh; /* 화면 전체 높이 */
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;

const Dot = styled.div`
  background: #d9d9d9;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin: 8px auto;
  box-shadow: 1px 1px 1px 0px;
  position: absolute;
  left: 50%;
`;


const ContentContainer = styled.div`
  flex-grow: 1; /* 남은 공간을 차지하도록 설정 */
  overflow-y: auto; /* 세로 스크롤 허용 */
  overflow-x: hidden; /* 가로 스크롤 방지 */
  justify-items: center;
    padding-bottom: 60px; /* 하단바 높이만큼 패딩 추가 */
`;

const PostContentWrapper = styled.div`
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export default PostPage;