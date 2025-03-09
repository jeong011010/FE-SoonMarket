import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Post } from '../../type/postType';
import useGetUserInfo from '../../api/Auth/useGetUserInfo';
import { forwardRef, useEffect, useState } from 'react';
import getTimeAgo from '../../utils/getTimeAgo';

interface PostProps {
  post: Post
};

const WidePostCard = forwardRef<HTMLDivElement, PostProps>(({ post }, ref) => {
  const uploadTime = new Date(post.createAt);
  const navigate = useNavigate();

  const { userInfo, getUserInfo } = useGetUserInfo();
  const [likeCount] = useState<number>(post.countLike);

  const formattedDate = getTimeAgo(uploadTime);

  useEffect(() => {
    if (userInfo?.id) {
      getUserInfo(userInfo.id);
    }
  }, [getUserInfo, userInfo?.id]);

  return (
    <DataContainer onClick={() => navigate(`/post/${post.postId}`)} ref={ref}>
      <img src={post.images[0]?.imageUrl} alt="일러스트" style={{ width: 120, height: 120, margin: 10, borderRadius: "5%" }} />
      <Detail>
        <h3 style={{ margin: "20px 0px 5px 0px" }}>{post.title}</h3>
        <PostDetail>
          <p style={{ margin: "5px 0px" }}>가격 : {post.price}</p>
          <p style={{ margin: "5px 0px" }}>작성일 : {formattedDate}</p>
        </PostDetail>
        <LikeDetail>
          <BtnBox>
            <FavoriteIcon fontSize='medium' />
          </BtnBox>
          <LikesContainer>
            <LikesText>{likeCount}</LikesText>
          </LikesContainer>
        </LikeDetail>
      </Detail>
    </DataContainer>
  );
});

const DataContainer = styled.div`
  width: 100%;
  display: flex;
`

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`
const PostDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
`

const LikesContainer = styled.div`
  display: flex;
  align-items: center;
  bottom: 0;
  right: 0;
  margin: 10px;
`

const LikeDetail = styled.div`
  display: flex;
  margin-left: auto;
`

const LikesText = styled.span`
  margin-left: -7px;
  font-size: 14px;
`

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default WidePostCard;