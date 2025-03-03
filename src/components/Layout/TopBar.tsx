import { Badge, Divider, IconButton, Menu, MenuItem } from "@mui/material"
import styled from "styled-components";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetNotificationList from "../../api/Notification/useGetNotificationList";

const TopBar: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const { notificationList, getNotificationList } = useGetNotificationList();
	const navigate = useNavigate();

	useEffect(() => {
		getNotificationList();
	}, [getNotificationList]);

	console.log(notificationList);

	const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		navigate(`/search?query=${searchQuery}`);
	}

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	}

	const handleClose = () => {
		setAnchorEl(null);
	}

	return (
		<TopBarContainer>
			<SearchBarContainer onSubmit={handleSearch}>
				<Input type="text" placeholder="검색어 입력" onChange={(e) => setSearchQuery(e.target.value)} />
				<IconButton type="submit">
					<SearchIcon />
				</IconButton>
			</SearchBarContainer>
			<IconButton onClick={handleOpen}>
				<AlarmBadge color="secondary" variant="dot" sx={{ width: "30px", height: "30px" }}>
					<NotificationsNoneOutlinedIcon sx={{ width: "30px", height: "30px" }} />
				</AlarmBadge>
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				onClick={handleClose}
			>
				{
					notificationList.map((notification) => (
						<>
							<MenuItem key={notification.id}>
								{notification.message}
							</MenuItem>
							<Divider />
						</>
					))
				}
			</Menu>
		</TopBarContainer>
	)
}

const SearchBarContainer = styled.form`
	display: flex;
	align-items: center;
	background-color: #f5f5f5; 
	border-radius: 20px; 
	padding: 5px 10px; 
	width: 320px;
	height: 20px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); 
	margin: 10px;
`;

const Input = styled.input`
	border: none; 
	background: none; 
	outline: none; 
	padding: 10px; 
	flex: 1; 
	font-size: 14px; 
	color: #757575; 
	width: 230px;
	
	::placeholder {
		color: #bdbdbd; 
	}
`;

const TopBarContainer = styled.div`
	width: 100%;
	height: 60px;
	display: flex;
	align-items: center;
	justify-content: center;
`

const AlarmBadge = styled(Badge)`
	&& .MuiBadge-dot {
		background-color: #2D61A6;
	}
`

export default TopBar;