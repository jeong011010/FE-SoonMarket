import { IconButton } from "@mui/material";
import styled from "styled-components";
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  opponentNickname: string | undefined;
  togglePopup: () => void;
}

const Header: React.FC<HeaderProps> = ({ opponentNickname, togglePopup }) => {
  const navigate = useNavigate();

  return (
    <HeaderBox>
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>
      <RoomTitle>{opponentNickname || "채팅방"}</RoomTitle>
      <IconButton onClick={togglePopup}>
        <MenuIcon />
      </IconButton>
    </HeaderBox>
  )
}

const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const RoomTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

export default Header;