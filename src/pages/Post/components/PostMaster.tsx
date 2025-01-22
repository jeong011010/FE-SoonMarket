import { IconButton } from "@mui/material";
import styled from "styled-components";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import useLikePost from "../../../api/Post/useLikePost";
import useGetUserInfo from "../../../api/Auth/useGetUserInfo";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from "react";

const PostMaster: React.FC<{ postId: number, userId: number, like: boolean }> = ({ postId, userId, like }) => {
  const likePost = useLikePost();
  const { userInfo, getUserInfo } = useGetUserInfo();
  const [likeState, setLikeState] = useState<boolean>(like);

  useEffect(() => {
    getUserInfo(userId);
  }, [getUserInfo, userId])

  const likeBtnClick = () => {
    setLikeState(prev => !prev);
    likePost(postId)
  }

  return (
    <UserBox>
      <ProfileImg imageUrl={userInfo?.image?.imageUrl} />
      <ProfileText>
        <p style={{ margin: 1 }}>{userInfo?.nickname}</p>
        <p style={{ margin: 1 }}>신고 횟수 0</p>
      </ProfileText>
      <BtnBox>
        <IconButton onClick={likeBtnClick}>
          {
            likeState ? <FavoriteIcon fontSize="large" /> : <FavoriteBorderIcon fontSize="large" />
          }
        </IconButton>
        <IconButton>
          <ReportGmailerrorredIcon fontSize="large" />
        </IconButton>
      </BtnBox>
    </UserBox >
  )
}

const UserBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px gray;
  padding: 10px;
`;

const ProfileImg = styled.div<{ imageUrl?: string }>`
  background: ${(props) => (props.imageUrl ? `url(${props.imageUrl})` : "#ddd")};
  background-size: cover;
  background-position: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid black;
`;

const ProfileText = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px 10px;
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 10px 0px auto;
`;

export default PostMaster;