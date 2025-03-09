import { useState, useEffect } from "react";
import styled from "styled-components";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setIsAuthenticated, setRole, setUserId } from "../../../redux/modules/auth";
import { FormControlLabel, Switch } from "@mui/material";
import useSetNotification from "../../../api/Notification/useSetNotification";
import useGetIsNotificationAllow from "../../../api/Notification/useGetIsNotificationAllow";

interface SettingPopupProps {
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  togglePopup: () => void;
}

const SettingPopup: React.FC<SettingPopupProps> = ({ showPopup, setShowPopup, togglePopup }) => {
  const [isOpenAccSet, setIsOpenAccSet] = useState(false);
  const { setNotification } = useSetNotification();
  const { isNotificationAllow, getIsNotificationAllow } = useGetIsNotificationAllow();

  const [notificationStatus, setNotificationStatus] = useState<boolean>(false); // 로컬 상태 추가

  const navigate = useNavigate();
  const cookies = new Cookies();
  const dispatch = useDispatch();

  // ✅ 마운트 시 `isNotificationAllow` 값을 로컬 상태에 설정
  useEffect(() => {
    setNotificationStatus(isNotificationAllow);
  }, [isNotificationAllow]);

  // ✅ 알림 설정 변경 함수
  const handleSetNotification = () => {
    const newStatus = !notificationStatus; // 현재 상태 반전
    setNotificationStatus(newStatus);
    setNotification(newStatus);
  };

  const handleChangePassword = () => {
    navigate("/reset-password");
  };

  const handleLogout = () => {
    cookies.remove("access_token", { path: "/" });
    cookies.remove("refresh_token", { path: "/" });
    dispatch(setIsAuthenticated(false));
    dispatch(setUserId(""));
    dispatch(setRole(""));
    navigate("/");
  };

  return (
    <PopupOverlay showPopup={showPopup} onClick={togglePopup}>
      <PopupContainer showPopup={showPopup} onClick={(e) => e.stopPropagation()}>
        <PopupButton onClick={() => alert(`/ServerInfo`)}>버전 업데이트 내역</PopupButton>
        <PopupButton onClick={() => navigate("/Introduction")}>개발진 정보</PopupButton>

        {/* 계정 관리 */}
        <PopupButton onClick={() => setIsOpenAccSet(!isOpenAccSet)} isOpen={isOpenAccSet}>
          계정 관리
          {isOpenAccSet ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </PopupButton>

        <AccountManageContainer isOpen={isOpenAccSet}>
          {/* ✅ 알림 설정 토글 */}
          <FormControlLabel
            control={
              <Switch
                checked={notificationStatus} // ✅ `isNotificationAllow` → `notificationStatus`
                onChange={handleSetNotification} // ✅ `setNotification(!isNotificationAllow)`
                color="primary"
              />
            }
            label={notificationStatus ? "알림 설정" : "알림 끄기"}
            style={{ marginTop: "10px", fontWeight: "bold" }}
          />

          <SpecialPopupButton onClick={handleChangePassword}>비밀번호 수정</SpecialPopupButton>
          <SpecialPopupButton logout onClick={handleLogout}>로그아웃</SpecialPopupButton>
        </AccountManageContainer>
      </PopupContainer>
    </PopupOverlay>
  );
};

export default SettingPopup;

const AccountManageContainer = styled.div<{ isOpen: boolean }>`
  overflow: hidden;
  max-height: ${({ isOpen }) => (isOpen ? "150px" : "0px")};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
`;

const PopupOverlay = styled.div<{ showPopup: boolean }>`
  z-index: 99999;
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

const SpecialPopupButton = styled(PopupButton)<{ logout?: boolean }>`
  background: ${({ logout }) => (logout ? "#ffeded" : "#e0f7fa")};
  color: ${({ logout }) => (logout ? "#d32f2f" : "#00796b")};
  font-weight: bold;
`;