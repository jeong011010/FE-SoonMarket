import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import ChatIcon from '@mui/icons-material/Chat';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getInitialValue = (path: string) => {
    switch (path) {
      case '/main':
        return 0;
      case '/recommend':
        return 1;
      // 다른 경로에 따라 더 추가 가능
      case '/addpost':
        return 2;
      case '/chat-list':
        return 3;
      case '/mypage':
        return 4;
      case '/search':
        return 5;
      default:
        return -1;
    }
  };

  const [value, setValue] = useState(getInitialValue(location.pathname));

  useEffect(() => {
    setValue(getInitialValue(location.pathname));
  }, [location.pathname]);

  return (
    <FixedBottomNavigation
      showLabels
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue);
      }}
    >
      <NavItem label="홈" icon={<HomeIcon />} onClick={() => navigate('/main')} />
      <NavItem label="어떤데?" icon={<CardGiftcardIcon />} onClick={() => navigate('/recommend')} />
      <NavItem label="글쓰기" icon={<AddCircleOutlineIcon />} onClick={() => navigate('/addpost')} />
      <NavItem label="채팅" icon={<ChatIcon />} onClick={() => navigate('/chat-list')} />
      <NavItem
        label="마이페이지"
        icon={<TagFacesIcon />}
        sx={{
          '& .MuiBottomNavigationAction-label': {
            fontSize: '0.6rem', // 이 값을 조절하여 원하는 크기로 설정할 수 있습니다.
          },
          '&.Mui-selected': {
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.6rem', // 선택된 상태에서도 같은 크기를 유지하려면 이 값도 동일하게 설정합니다.
            },
          },
        }}
        onClick={() => navigate('/mypage')}
      />
    </FixedBottomNavigation>
  );
}

const FixedBottomNavigation = styled(BottomNavigation)`
  border-top: 2px solid #F1F1F1;
  position: absolute; /* 부모 컨테이너(AppContainer)의 기준으로 고정 */
  bottom: 0;
  left: 0;
  width: 100%; /* AppContainer의 너비에 맞춤 */
  z-index: 1000;

  && {
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const NavItem = styled(BottomNavigationAction)`
  && {
    .MuiBottomNavigationAction-label {
      font-size: 0.7rem;
      margin-top: 6px;
    }

    &.Mui-selected {
      .MuiBottomNavigationAction-label {
        font-size: 0.7rem;
      }
    }

    .MuiSvgIcon-root {
      font-size: 1.5rem; // 아이콘 크기를 조절합니다.
    }
  }
`

export default BottomNav;