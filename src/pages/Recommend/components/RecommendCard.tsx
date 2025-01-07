import React from "react";
import styled from "styled-components";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

interface RecommendCardProps {
  img: string; // 이미지 경로
  title: string; // 제목
  price: number; // 가격
  style?: React.CSSProperties; // 스타일(선택적)
  onThumbUp: () => void;
  onThumbDown: () => void;
}

const RecommendCard: React.FC<RecommendCardProps> = ({ img, title, price, style, onThumbDown, onThumbUp }) => {
  return (
    <RecommendCardBox style={style}>
      <img
        src={img}
        alt="게시글 사진"
        style={{ width: 280, height: 280, margin: 20, borderRadius: 10 }}
      />
      <h2 style={{ margin: "0px", textAlign: "center" }}>{title}</h2>
      <p>{price}</p>
      <LikeDislikeBtnBox>
        <LikeDislikeBtn>
          <ThumbDownOffAltIcon onClick={onThumbDown}/>
        </LikeDislikeBtn>
        <LikeDislikeBtn>
          <ThumbUpOffAltIcon onClick={onThumbUp}/>
        </LikeDislikeBtn>
      </LikeDislikeBtnBox>
    </RecommendCardBox>
  );
};

// Styled Components
const RecommendCardBox = styled.div`
  border-radius: 10px;
  width: 300px;
  height: 450px;
  position: absolute;
  border: solid 1px gray;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.5s ease;
  background-color: white;
`;

const LikeDislikeBtnBox = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: 0;
`;

const LikeDislikeBtn = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #f0f0f0;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export default RecommendCard;