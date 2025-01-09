import styled from "styled-components";
import { Box, Tab, Tabs, Typography, IconButton } from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import { useState, useEffect } from "react";
import MyInformation from "./components/MyInformation";
import MyPost from "./components/MyPost";
import useGetUserInfo from "../../api/Auth/useGetUserInfo";

const MyPage: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const { userInfo, getUserInfo } = useGetUserInfo();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return (
    <StyledBackground>
      <MyPageContainer>
        <Header>
          <Title>회원정보</Title>
          <IconButton color="default">
            <SettingsIcon />
          </IconButton>
        </Header>

        <ProfileSection>
          <ProfileImg imageUrl={userInfo?.image?.imageUrl} />
          <Typography variant="h6">{userInfo?.nickname || "순붕이"}</Typography>
        </ProfileSection>

        <Body>
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

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden; /* 슬라이드 애니메이션을 위한 숨김 처리 */
`;

const SlidingContainer = styled.div<{ value: number }>`
  display: flex;
  width: 200%; /* 두 컴포넌트를 나란히 배치 */
  transform: translateX(${(props) => props.value * -50}%); /* 슬라이딩 */
  transition: transform 0.5s ease-in-out; /* 부드러운 애니메이션 */
`;

const SlidingPanel = styled.div`
  width: 50%; /* 각 패널이 전체의 절반 차지 */
  flex-shrink: 0;
  padding: 16px;
  box-sizing: border-box;
`;

const StyledBackground = styled.div`
  background: #ffffff;
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: solid 1px gray;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 1.85rem;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const ProfileImg = styled.div<{ imageUrl?: string }>`
  background: ${(props) => (props.imageUrl ? `url(${props.imageUrl})` : "#ddd")};
  background-size: cover;
  background-position: center;
  width: 140px;
  height: 140px;
  margin-top: 16px;
  border-radius: 50%;
  border: 3px solid black;
`;

const TabBox = styled(Box)`
  width: 100%;
  margin-top: 16px;
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