import React, { useEffect } from "react";
import useGetPost from "../../../api/Post/useGetPost";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface PostInfoProps {
  postId: string;
}

const PostInfo: React.FC<PostInfoProps> = ({ postId }) => {
  const { post, getPost } = useGetPost();
  const navigate = useNavigate();

  useEffect(() => {
    getPost(postId);
  }, [getPost, postId]);

  return (
    <>
      {
        post && (
          <PostInfoContainer onClick={() => navigate(`/post/${post.postId}`)}>
            <PostImage src={post.images?.[0]?.imageUrl || "/default-image.jpg"} alt="post" />
            <PostDetails>
              <PostTitle>{post.title}</PostTitle>
              <PostPrice>{post.price.toLocaleString()}원</PostPrice>
            </PostDetails>
          </PostInfoContainer>
        )
      }
    </>
  );
};

const PostInfoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background: #f8f9fa;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  transition: background 0.2s ease-in-out;
  width: 100%;

  &:hover {
    background: #e9ecef;
  }
`;

const PostImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 10px;
`;

const PostDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostTitle = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

const PostPrice = styled.div`
  font-size: 12px;
  color: #888;
`;

export default PostInfo;