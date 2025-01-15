import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { setIsAuthenticated, setRole, setUserId } from "../../../redux/modules/auth";
import { useDispatch } from "react-redux";
import { User } from "../../../type/userType";

interface MyInformationProps {
  userInfo: User | null;
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
    dispatch(setUserId(''));
    dispatch(setRole(''));
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
      <ButtonContainer>
        <Button onClick={handleOpenChat}>오픈채팅방으로 이동</Button>
        <Button onClick={() => navigate("/edit-profile")}>내 정보 수정</Button>
        <Button variant="danger" onClick={handleLogout}>로그아웃</Button>
      </ButtonContainer>
    </InformationBox>
  );
};

const InformationBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoText = styled.p`
  font-size: 18px;
  color: #333;
  margin: 10px 10px;
  line-height: 1.6;
`;


const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  gap: 15px; /* 버튼 간격 추가 */
  margin-top: auto;
  padding-top: 20px;
`;

const Button = styled.button<{ variant?: "primary" | "danger" }>`
  padding: 12px 20px; /* 버튼 내부 여백 조정 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  border: 2px solid
    ${(props) => (props.variant === "danger" ? "#d32f2f" : "#5a5a5a")};
  background-color: transparent;
  color: ${(props) => (props.variant === "danger" ? "#d32f2f" : "#5a5a5a")};
  cursor: pointer;
  transition: all 0.3s ease;

  width: 100%; /* 버튼이 컨테이너 너비를 채우도록 설정 */

  &:hover {
    background-color: ${(props) =>
    props.variant === "danger" ? "#d32f2f" : "#5a5a5a"};
    color: white;
  }

`;

export default MyInformation;