import { IconButton } from "@mui/material";
import styled from "styled-components";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import useLikePost from "../../../api/Post/useLikePost";
import useGetUserInfo from "../../../api/Auth/useGetUserInfo";
import { useEffect } from "react";

const PostMaster: React.FC<{ postId: number, userId: number }> = ({ postId, userId }) => {
  const likePost = useLikePost();
  const { userInfo, getUserInfo } = useGetUserInfo();
  console.log(userInfo);

  useEffect(() => {
    getUserInfo(userId);
  }, [getUserInfo, userId])

  return (
    <UserBox>
      {
        userInfo?.image.imageUrl.includes("default") ?
          <DefaultProfileImg />
          :
          <ProfileImg src={userInfo?.image.imageUrl} alt="프로필사진" />
      }
      <ProfileText>
        <p style={{ margin: 1 }}>{userInfo?.nickname}</p>
        <p style={{ margin: 1 }}>신고 횟수 0</p>
      </ProfileText>
      <BtnBox>
        <IconButton onClick={() => likePost(postId)}>
          <FavoriteBorderIcon fontSize="large" />
        </IconButton>
        <IconButton>
          <ReportGmailerrorredIcon fontSize="large" />
        </IconButton>
      </BtnBox>
    </UserBox>
  )
}

const UserBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DefaultProfileImg = styled.div`
  width: 70px;
  height: 70px;
  background: gray;
  margin: 10px;
`

const ProfileImg = styled.img`
  width: 70px;
  height: 70px;
  margin: 10px;
`;

const ProfileText = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px 0px;
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 10px 0px auto;
`;

export default PostMaster;