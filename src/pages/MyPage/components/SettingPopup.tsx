import { useState } from "react";
import styled from "styled-components";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setIsAuthenticated, setRole, setUserId } from "../../../redux/modules/auth";

interface SettingPopupProps {
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  togglePopup: () => void;
}

const SettingPopup: React.FC<SettingPopupProps> = ({ showPopup, setShowPopup, togglePopup }) => {
  const [isOpenAccSet, setIsOpenAccSet] = useState(false);

  const handleBlockUser = () => {
    alert(`님을 차단했습니다.`);
    setShowPopup(false);
  };

  const handleReportUser = () => {
    alert(`님을 신고했습니다.`);
    setShowPopup(false);
  };

  const handleOpenAccSet = () => {
    setIsOpenAccSet(!isOpenAccSet);
  }

  const navigate = useNavigate();
  const cookies = new Cookies();
  const dispatch = useDispatch();

  const handleChangePassowrd = () => {
    navigate("/reset-password")
  }

  const handleLogout = () => {
    navigate("/");
    cookies.remove("access_token", { path: "/" });
    cookies.remove("refresh_token", { path: "/" });
    dispatch(setIsAuthenticated(false));
    dispatch(setUserId(''));
    dispatch(setRole(''));
  };

  return (
    <PopupOverlay showPopup={showPopup} onClick={togglePopup}>
      <PopupContainer showPopup={showPopup} onClick={(e) => e.stopPropagation()}>
        <PopupButton onClick={handleBlockUser}>버전 업데이트 내역</PopupButton>
        <PopupButton onClick={handleReportUser}>개발진 정보</PopupButton>
        <PopupButton onClick={handleOpenAccSet} isOpen={isOpenAccSet}>
          계정 관리
          {isOpenAccSet ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </PopupButton>
        <AccountManageContainer isOpen={isOpenAccSet}>
          <SpecialPopupButton onClick={handleChangePassowrd}>비밀번호 수정</SpecialPopupButton>
          <SpecialPopupButton logout onClick={handleLogout}>로그아웃</SpecialPopupButton>
        </AccountManageContainer>
      </PopupContainer>
    </PopupOverlay>
  )
}

const AccountManageContainer = styled.div<{ isOpen: boolean }>`
  overflow: hidden;
  max-height: ${({ isOpen }) => (isOpen ? "100px" : "0px")}; /* 높이 변화 애니메이션 */
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
`;

const PopupOverlay = styled.div<{ showPopup: boolean }>`
  z-index:99999;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  opacity: ${({ showPopup }) => (showPopup ? "1" : "0")};
  pointer-events: ${({ showPopup }) => (showPopup ? "auto" : "none")};
  transition: opacity 0.3s ease-in-out;
`;

const PopupContainer = styled.div<{ showPopup: boolean }>`
  background: white;
  max-width: 400px;
  width: 100%;
  padding: 15px;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: 0;
  transform: ${({ showPopup }) => (showPopup ? "translateY(0)" : "translateY(100%)")};
  transition: transform 0.3s ease-in-out;
`;

const PopupButton = styled.button<{ isOpen?: boolean }>`
  width: 100%;
  padding: 12px;
  border: none;
  background: ${({ isOpen }) => (isOpen ? "#ddd" : "#f5f5f5")};
  color: black;
  font-size: 16px;
  cursor: pointer;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.3s ease-in-out;
`;

const SpecialPopupButton = styled(PopupButton) <{ logout?: boolean }>`
  background: ${({ logout }) => (logout ? "#ffeded" : "#e0f7fa")}; /* 🔥 로그아웃은 붉은색, 비밀번호 수정은 파란색 */
  color: ${({ logout }) => (logout ? "#d32f2f" : "#00796b")}; /* 🔥 로그아웃 글씨는 빨간색, 비밀번호 수정은 파란색 */
  font-weight: bold;
`;

export default SettingPopup;