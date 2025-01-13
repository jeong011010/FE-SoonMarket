import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect } from "react";
import useGetPost from "../../api/Post/useGetPost";
import PostImgBox from "./components/PostImgBox";
import PostMaster from "./components/PostMaster";
import PostContent from "./components/PostContent";
import ChatBtn from "./components/ChatBtn";

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
      {
        post && <PostMaster postId={post.postId} userId={post.userId} />
      }
      {
        post && <PostContent post={post} />
      }
      <ChatBtn />
    </PostContainer>
  );
};

const PostContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
`;

export default PostPage;