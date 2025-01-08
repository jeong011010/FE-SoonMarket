import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Button, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect } from "react";
import useGetPost from "../../api/Post/useGetPost";
import PostImgBox from "./components/PostImgBox";
import PostMaster from "./components/PostMaster";
import PostContent from "./components/PostContent";

const PostPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { post, getPost } = useGetPost();

  useEffect(() => {
    if (id) {
      getPost(id);
    }
  }, [getPost, id]);

  return (
    <PostContainer>
      <IconButton
        onClick={() => navigate(-1)}
        style={{ position: "fixed", top: 0, left: 0, margin: "10px", zIndex: 100 }}
      >
        <ArrowBackIcon />
      </IconButton>
      {
        post?.images && <PostImgBox images={post.images} />
      }
      <PostMaster />
      {
        post && <PostContent post={post} />
      }
      <BottomBtnBox>
        <BottomBtn
          variant="contained"
          onClick={() => window.open("https://open.kakao.com/o/sftW1KOg")}
        >
          오픈 채팅으로 거래하기
        </BottomBtn>
      </BottomBtnBox>
    </PostContainer>
  );
};

const PostContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
`;

const BottomBtnBox = styled.div`
  width: 100%;
  height: 60px;
  background: white;
  position: fixed;
  bottom: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1);
`;

const BottomBtn = styled(Button)`
  width: 95%;
  height: 40px;
  && {
    background-color: #bdd9f2;
    color: #000;
  }
`;

export default PostPage;