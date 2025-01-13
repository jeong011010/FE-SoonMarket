import { Button } from "@mui/material";
import styled from "styled-components";

const ChatBtn: React.FC = () => {
  return (
    <BottomBtnBox>
      <BottomBtn
        variant="contained"
        onClick={() => window.open("https://open.kakao.com/o/sftW1KOg")}
      >
        오픈 채팅으로 거래하기
      </BottomBtn>
    </BottomBtnBox>
  )
}

const BottomBtnBox = styled.div`
  width: 100%;
  height: 60px;
  background: white;
  position: fixed;
  bottom: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1);
`;

const BottomBtn = styled(Button)`
  width: 95%;
  height: 40px;
  && {
    background-color: #bdd9f2;
    color: #000;
  }
`;

export default ChatBtn;