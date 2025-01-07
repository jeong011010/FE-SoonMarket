import styled from "styled-components";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../../../api/Auth/useGetUserInfo";
import { Cookies } from "react-cookie";
import { setIsAuthenticated } from "../../../redux/modules/auth";
import { useDispatch } from "react-redux";

interface MyInformationProps {
  userInfo: UserInfo | null;
}

const MyInformation: React.FC<MyInformationProps> = ({ userInfo }) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
	const dispatch = useDispatch();

  const handleOpenChat = () => {
    if (userInfo?.openchatUrl) {
      window.open(userInfo.openchatUrl, "_blank"); // 새 창에서 오픈채팅방 링크 열기
    }
  };

  const handleLogout = () => {
    cookies.remove("access_token", { path: "/" });
    dispatch(setIsAuthenticated(false));
    navigate("/");
  };

  return (
    <InformationBox>
      <InfoText>
        <strong>이름:</strong> {userInfo?.name || "정보 없음"}
      </InfoText>
      <InfoText>
        <strong>전화번호:</strong> {userInfo?.phone || "정보 없음"}
      </InfoText>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleOpenChat}
        style={{ margin: "20px 0" }}
      >
        오픈채팅방으로 이동
      </Button>
      <BottomButtonContainer>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/edit-profile")}
        >
          내 정보 수정
        </Button>
        <Button variant="contained" color="error" onClick={handleLogout}>
          로그아웃
        </Button>
      </BottomButtonContainer>
    </InformationBox>
  );
};

const InformationBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoText = styled.p`
  font-size: 18px;
  color: #333;
  margin: 10px 0;
  line-height: 1.6;
`;

const BottomButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 20px;
`;

export default MyInformation;