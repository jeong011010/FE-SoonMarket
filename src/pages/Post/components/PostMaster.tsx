import { IconButton } from "@mui/material";
import styled from "styled-components";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

const PostMaster: React.FC = () => {
  return (
    <UserBox>
      <ProfileImg />
      <ProfileText>
        <p style={{ margin: 1 }}>이름</p>
        <p style={{ margin: 1 }}>신고 횟수 0</p>
      </ProfileText>
      <BtnBox>
        <IconButton>
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

const ProfileImg = styled.div`
  width: 70px;
  height: 70px;
  background: gray;
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