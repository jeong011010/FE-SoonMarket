import { Box, IconButton, Tab, Tabs, TextField, Typography } from "@mui/material";
import styled from "styled-components";

import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import useGetUserInfo from "../../api/Auth/useGetUserInfo";
import MyPost from "./components/MyPost";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LikePosts from "./components/LikePosts";
import useEditProfile from "../../api/Auth/useEditProfile";
import { useNavigate } from "react-router-dom";

const MyPage: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const { userInfo, getUserInfo } = useGetUserInfo();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const editProfile = useEditProfile();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [nickname, setNickname] = useState(userInfo?.nickname || "");

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0 && userInfo) {
      const file = event.target.files[0];
      handleSubmit(file, userInfo?.nickname);
    }
  };

  const handleEditClick = () => {
    setIsEditingNickname(true);
  };
  
  const handleBlur = () => {
    setIsEditingNickname(false);
    setNickname(""); // 🔥 수정 취소 시 원래 닉네임 복원
  };
  
  const handleNickNameChange = async () => {
    if (!nickname.trim() || nickname === userInfo?.nickname) {
      setIsEditingNickname(false);
      return;
    }
  
    if (userInfo) {
      try {
        const response = await fetch(userInfo.image.imageUrl);
        const blob = await response.blob();
        const file = new File([blob], "profile-image", { type: blob.type });
  
        await handleSubmit(file, nickname);
        setIsEditingNickname(false);
      } catch (error) {
        console.error("Error converting image URL to File:", error);
      }
    }
  };

  const handleSubmit = async (file: File, nickname: string) => {
    const requestData = {
      nickname,
    };

    const formData = new FormData();
    formData.append(
      "request",
      new Blob([JSON.stringify(requestData)], { type: "application/json" })
    );
    // 파일이 선택되지 않은 경우 처리
    if (file) {
      formData.append("file", file);
    }

    try {
      await editProfile(formData);
      navigate(0);
    } catch (error) {
      console.error("프로필 수정 중 오류 발생", error);
      alert("프로필 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    getUserInfo(userId);
  }, [getUserInfo, userId]);

  return (
    <StyledBackground>
      <MyPageContainer>
        <Header>
          <Title>회원정보</Title>
          <IconButton color="default">
            <SettingsIcon />
          </IconButton>
        </Header>
        <Body>
        <ProfileSection>
          <ProfileImgContainer
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => document.getElementById("image-upload")?.click()} // 클릭하면 파일 선택 창 열기
          >
            <ProfileImg imageUrl={userInfo?.image?.imageUrl} />
            <EditOverlay visible={isHovered}>
              <EditIcon fontSize="large" />
            </EditOverlay>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </ProfileImgContainer>
          <NicknameContainer>
            {isEditingNickname ? (
              <StyledTextFieldWrapper isEditing={isEditingNickname}>
                <StyledTextField
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  onBlur={() => setTimeout(handleBlur, 100)}
                  onKeyDown={(e) => e.key === "Enter" && handleNickNameChange()}
                  autoFocus
                  variant="standard"
                />
                <SaveButton onClick={handleNickNameChange}>저장</SaveButton>
              </StyledTextFieldWrapper>
            ) : (
              <NicknameWrapper>
                <Typography variant="h6">{userInfo?.nickname || "순붕이"}</Typography>
                <EditIconButton onClick={handleEditClick} size="small">
                  <EditIcon style={{position:"absolute"}} fontSize="small" />
                </EditIconButton>
              </NicknameWrapper>
            )}
          </NicknameContainer>

        </ProfileSection>
          <TabBox>
            <StyledTabs value={value} onChange={handleChange} centered>
              <StyledTab label="내가 올린 게시물" {...a11yProps(1)} />
              <StyledTab label="좋아요" {...a11yProps(2)} />
            </StyledTabs>
          </TabBox>
          <SlidingContainer value={value}>
            <SlidingPanel>
              <MyPost />
            </SlidingPanel>
            <SlidingPanel>
              <LikePosts />
            </SlidingPanel>
          </SlidingContainer>
        </Body>
      </MyPageContainer>
    </StyledBackground>
  );
};

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100dvh; /* 화면 전체 높이를 차지 */
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto; /* 수직 스크롤만 허용 */
  overflow-x: hidden; /* 좌우 스크롤 방지 */
  box-sizing: border-box; /* 패딩 포함 크기 계산 */

  padding-bottom: 60px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SlidingContainer = styled.div<{ value: number }>`
  display: flex;
  width: 200%; /* 두 패널을 나란히 배치 */
  transform: translateX(${(props) => props.value * -50}%); /* 활성화된 탭으로 이동 */
  transition: transform 0.5s ease-in-out; /* 슬라이딩 애니메이션 */
`;

const SlidingPanel = styled.div`
  width: 50%; /* 컨테이너의 절반 크기를 차지 */
  flex-shrink: 0; /* 크기 고정 */
  padding: 16px;
  box-sizing: border-box;
`;

const StyledBackground = styled.div`
  background: #ffffff;
  display: flex;
  justify-content: center;
  min-height: 100dvh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border-bottom: solid 1px gray;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  padding: 10px;
`;

const ProfileSection = styled.div`
  margin: 10px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImg = styled.div<{ imageUrl?: string }>`
  width: 100%;
  height: 100%;
  background: ${(props) => (props.imageUrl ? `url(${props.imageUrl})` : "#ddd")};
  background-size: cover;
  background-position: center;
  border-radius: 50%;
`;

const ProfileImgContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid black;
  overflow: hidden; /* 🔥 프로필 이미지가 넘치지 않도록 설정 */

  &:hover label { /* 🔥 마우스 오버 시 EditOverlay 표시 */
    opacity: 1;
  }
`;

const EditOverlay = styled.label<{ visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out; /* 🔥 부드러운 전환 효과 */
  opacity: 0; /* 기본적으로 숨김 */

  svg {
    color: white;
  }
`;

const NicknameContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
  min-height: 36px;
`;

const NicknameWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%); /* 🔥 완벽한 중앙 정렬 */
  display: flex;
  align-items: center;
`;

const StyledTextFieldWrapper = styled.div<{ isEditing: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  opacity: ${(props) => (props.isEditing ? 1 : 0)};
  transform: ${(props) => (props.isEditing ? "scale(1)" : "scale(0.95)")};
  height: ${(props) => (props.isEditing ? "36px" : "0px")};
  overflow: hidden;
`

const StyledTextField = styled(TextField)`
  width: 150px;
  text-align: center;
  /* 기본 테두리 제거 */
  .MuiOutlinedInput-root {
    & fieldset {
      border: none;
    }
  }

  input {
    font-size: 1rem; /* 닉네임과 동일한 크기 */
    padding: 5px 0;
    height: auto;
  }
`;

const EditIconButton = styled(IconButton)`
  right: -35px;
`;

const SaveButton = styled.button`
  background: none;
  border: none;
  color: #2575fc;
  font-size: 14px;
  cursor: pointer;
  padding: 5px 10px;
  font-weight: bold;
  transition: color 0.2s ease-in-out, transform 0.2s ease-in-out;
  right: -35px;

  &:hover {
    color: #6a11cb;
  }
`;

const TabBox = styled(Box)`
  width: 100%;
  border-bottom: 1px solid #ddd;
`;

const StyledTabs = styled(Tabs)`
  .MuiTabs-flexContainer {
    justify-content: space-around;
  }
`;

const StyledTab = styled(Tab)`
  width: 33%;
  font-weight: 600;
  color: #666;
  &:hover {
    color: #2575fc;
  }
  &.Mui-selected {
    color: #6a11cb;
    font-weight: bold;
  }
`;

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default MyPage;