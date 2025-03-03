import { Button } from "@mui/material";
import styled from "styled-components";
import useAddChat from "../../../api/Chat/useAddChat";
import { Post } from "../../../type/postType";
import useEditIsSold from "../../../api/Post/useEditIsSold";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useState, useEffect } from "react";

const BottomBar: React.FC<{ post: Post }> = ({ post }) => {
  const addChat = useAddChat();
  const editIsSold = useEditIsSold();
  const userId = useSelector((state: RootState) => state.auth.userId);

  // ✅ 로컬 상태 추가
  const [isSold, setIsSold] = useState(post.sold);

  // ✅ 판매 상태 변경 핸들러
  const handleEditIsSold = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // 🔹 UI를 즉시 업데이트
    setIsSold((prev) => !prev);

    try {
      await editIsSold(post.postId);
    } catch (error) {
      console.error("판매 상태 변경 실패:", error);
      setIsSold((prev) => !prev); // 🔥 실패 시 원래 상태로 복구
    }
  };

  // ✅ 판매 상태가 변경되었을 때 서버에서 업데이트된 데이터 반영
  useEffect(() => {
    setIsSold(post.sold);
  }, [post.sold]);

  return (
    <BottomBtnBox>
      {userId !== post.userId?.toString() ? (
        <ChatBtn variant="contained" onClick={() => addChat(post.postId)}>
          채팅 하기
        </ChatBtn>
      ) : (
        <ChatBtn variant="contained" onClick={handleEditIsSold}>
          {isSold ? '"판매 중"으로 변경' : '"판매 완료"로 변경'}
        </ChatBtn>
      )}
    </BottomBtnBox>
  );
};

const BottomBtnBox = styled.div`
  border-top: 2px solid #F1F1F1;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  && {
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const ChatBtn = styled(Button)`
  width: 100%;
  height: 40px;
  && {
    background-color: #bdd9f2;
    color: #000;
    margin: 10px;
  }
`;

export default BottomBar;