import { Box, IconButton, Tab, Tabs, Typography } from "@mui/material";
import styled from "styled-components";

import SettingsIcon from "@mui/icons-material/Settings";
import { useEffect, useState } from "react";
import useGetUserInfo from "../../api/Auth/useGetUserInfo";
import MyInformation from "./components/MyInformation";
import MyPost from "./components/MyPost";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const MyPage: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const { userInfo, getUserInfo } = useGetUserInfo();
  const userId = useSelector((state: RootState) => state.auth.userId);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
            <ProfileImg imageUrl={userInfo?.image?.imageUrl} />
            <Typography variant="h6">{userInfo?.nickname || "순붕이"}</Typography>
          </ProfileSection>
          <TabBox>
            <StyledTabs value={value} onChange={handleChange} centered>
              <StyledTab label="내 정보" {...a11yProps(0)} />
              <StyledTab label="내가 올린 게시물" {...a11yProps(1)} />
            </StyledTabs>
          </TabBox>
          <SlidingContainer value={value}>
            <SlidingPanel>
              <MyInformation userInfo={userInfo} />
            </SlidingPanel>
            <SlidingPanel>
              <MyPost />
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
  background: ${(props) => (props.imageUrl ? `url(${props.imageUrl})` : "#ddd")};
  background-size: cover;
  background-position: center;
  width: 120px;
  height: 120px;
  margin-top: 5px;
  border-radius: 50%;
  border: 3px solid black;
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
  width: 50%;
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