import { useParams } from "react-router-dom";
import useGetUserInfo from "../../api/Auth/useGetUserInfo";
import { useEffect } from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import UserPost from "./components/UserPost";

const UserPage: React.FC = () => {
  const { id } = useParams();
  const { userInfo, getUserInfo } = useGetUserInfo();

  useEffect(() => {
    if (id) {
      getUserInfo(id);
    }
  }, [getUserInfo, id]);

  return (
    <>
      <Header>
        <h2>{userInfo?.nickname}님의 정보</h2>
      </Header>
      <UserContainer>
        <ProfileImg alt="프로필 이미지" src={userInfo?.image?.imageUrl} />
        <Typography variant="h5">{userInfo?.nickname || "순붕이"}</Typography>
        <p>신고당한 횟수: {userInfo?.reportCount}회</p>
      </UserContainer>
      <UserPost userId={id} />
    </>
  );
}

const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  border-bottom: solid 1px gray;
  padding: 5px;
`

const UserContainer = styled.div`
  margin-top: 80px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProfileImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
`


export default UserPage;