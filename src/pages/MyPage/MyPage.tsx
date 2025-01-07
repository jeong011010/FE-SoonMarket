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
          <CustomTabPanel value={value} index={0}>
            <MyInformation userInfo={userInfo} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <MyPost />
          </CustomTabPanel>
        </Body>
      </MyPageContainer>
    </StyledBackground>
  );
};

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

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
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

type CustomTabPanelProps = {
  children: React.ReactNode;
  value: number;
  index: number;
};

const CustomTabPanel: React.FC<CustomTabPanelProps> = ({ children, value, index }) => {
  return (
    <div style={{ width: "100%", justifyItems: "center" }}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default MyPage;