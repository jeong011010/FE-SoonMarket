import { IconButton } from "@mui/material";
import styled from "styled-components";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import useLikePost from "../../../api/Post/useLikePost";
import useGetUserInfo from "../../../api/Auth/useGetUserInfo";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import useDeletePost from "../../../api/Post/useDeletePost";
import { useNavigate } from "react-router-dom";

const PostMaster: React.FC<{ postId: number, postUserId: number, like: boolean, setIsClickedReportBtn: React.Dispatch<SetStateAction<boolean>> }> = ({ postId, postUserId, like, setIsClickedReportBtn }) => {
  const likePost = useLikePost();
  const deletePost = useDeletePost();
  const { userInfo, getUserInfo } = useGetUserInfo();
  const [likeState, setLikeState] = useState<boolean>(like);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const navigate = useNavigate();

  const editBtnClick = () => {
    navigate(`/editpost/${postId}`);
  };

  useEffect(() => {
    getUserInfo(postUserId);
  }, [getUserInfo, postUserId])

  const likeBtnClick = () => {
    setLikeState(prev => !prev);
    likePost(postId)
  }

  const deleteBtnClick = async () => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await deletePost(postId);
        alert("게시물이 삭제되었습니다.");
        // TODO: 삭제 후 게시물 목록 업데이트 로직 필요 (ex: 페이지 이동 또는 상태 업데이트)
      } catch (error) {
        console.error("게시물 삭제 실패:", error);
        alert("게시물 삭제에 실패했습니다.");
      }
    }
  };

  return (
    <UserBox>
      <ProfileImg imageUrl={userInfo?.image?.imageUrl} />
      <ProfileText>
        <p style={{ margin: 1 }}>{userInfo?.nickname}</p>
        <p style={{ margin: 1 }}>신고 횟수 0</p>
      </ProfileText>
      { Number(userId) === postUserId ? (
        <BtnBox>
          <Button onClick={editBtnClick}>수정</Button>
          /
          <Button onClick={deleteBtnClick}>삭제</Button>
        </BtnBox>
      ): (
        <BtnBox>
          <IconButton onClick={likeBtnClick}>
            {
              likeState ? <FavoriteIcon fontSize="medium" /> : <FavoriteBorderIcon fontSize="medium" />
            }
          </IconButton>
          <IconButton onClick={() => setIsClickedReportBtn(true)}>
            <ReportGmailerrorredIcon fontSize="medium" />
          </IconButton>
        </BtnBox>
      )}
      
    </UserBox >
  )
}

const UserBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px gray;
  padding: 10px 20px;
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
  margin: 0px 0px 0px auto;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: white;
  border: 0px;
`;

export default PostMaster;