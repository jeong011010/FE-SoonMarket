import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import styled from "styled-components";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetNotificationList from "../../api/Notification/useGetNotificationList";
import useNotificationListener from "../../api/Notification/useNotificationListener";
import useSetNotificationRead from "../../api/Notification/useSetNotificationRead";
import getTimeAgo from "../../utils/getTimeAgo";
import useGetPost from "../../api/Post/useGetPost";
import { PostImage } from "../../type/postType";

const TopBar: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const { notificationList, getNotificationList } = useGetNotificationList();
	const { notifications } = useNotificationListener();
	const setNotificationRead = useSetNotificationRead();
	const { getPost } = useGetPost();
	const [postImgList, setPostImgList] = useState<PostImage[]>([]);
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(true);
	const [showNewNotification, setShowNewNotification] = useState(false);

	useEffect(() => {
		getNotificationList();
	}, [getNotificationList]);

	useEffect(() => {
		if (notifications.length > 0) {
			getNotificationList(); // 실시간 알림이 오면 최신 알림 리스트를 가져옴
		}
	}, [notifications, getNotificationList]); // notifications이 변경될 때마다 호출

	useEffect(() => {
		const fetchPostImages = async () => {
			const images: PostImage[] = [];
			for (const notification of notificationList) {
				if (notification.postId) {
					const postData = await getPost(notification.postId);
					if (postData && postData.images && postData.images.length > 0) {
						images.push(postData.images[0]);
					}
				}
			}
			setPostImgList(images);
			setLoading(false); // 로딩 완료 후 false로 변경
		};

		if (notificationList.length > 0) {
			fetchPostImages();
		} else {
			setLoading(false); // 빈 리스트라도 로딩 종료
		}
	}, [notificationList, getPost]);

	useEffect(() => {
		if (notifications.length > 0) {
			setShowNewNotification(true);
			setTimeout(() => {
				setShowNewNotification(false);
			}, 5000); // 5초 후 자동으로 숨김
		}
	}, [notifications]);

	const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		navigate(`/search?query=${searchQuery}`);
	};

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleNotificationClick = (notificationId: string | number, postId: string | number, message: string, read: boolean) => {
		message.includes("좋아요") ? navigate(`/post/${postId}`) : navigate(`/chat-list`);
		if (!read) setNotificationRead(notificationId);
	}

	const unreadCount = notificationList.filter((notification) => !notification.read).length;

	return (
		<TopBarContainer>
			{showNewNotification && (
				<NewNotificationMessage>새로운 알림이 왔습니다</NewNotificationMessage>
			)}
			{loading ? <p>Loading...</p> : (
				<>
					<SearchBarContainer onSubmit={handleSearch}>
						<Input type="text" placeholder="검색어 입력" onChange={(e) => setSearchQuery(e.target.value)} />
						<IconButton type="submit">
							<SearchIcon />
						</IconButton>
					</SearchBarContainer>

					<IconButton onClick={handleOpen}>
						<AlarmBadge badgeContent={unreadCount} color="error">
							<NotificationsNoneOutlinedIcon sx={{ width: "30px", height: "30px" }} />
						</AlarmBadge>
					</IconButton>

					<NotificationMenu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose}>
						{/* 기존 알림 리스트 */}
						{notificationList.map((notification, idx) => (
							<NotificationItem
								key={notification.id}
								onClick={() => handleNotificationClick(notification.id, notification.postId, notification.message, notification.read)}
							>
								{postImgList[idx] && <img src={postImgList[idx].imageUrl} alt="미리보기" width={60} height={60} style={{ margin: "15px 10px 15px 10px" }} />}
								<ItemContent>
									{notification.message}
									<p style={{ margin: 0 }}>{getTimeAgo(new Date(notification.createdAt))}</p>
								</ItemContent>
							</NotificationItem>
						))}

						{/* 알림이 없을 경우 */}
						{notificationList.length === 0 && notifications.length === 0 && (
							<MenuItem>새로운 알림이 없습니다.</MenuItem>
						)}
					</NotificationMenu>
				</>
			)}
		</TopBarContainer>
	);
};

const NewNotificationMessage = styled.div`
	position: absolute;
	top: 50px;
	background-color: #ff9800;
	color: white;
	padding: 8px 16px;
	border-radius: 8px;
	font-size: 14px;
	font-weight: bold;
	box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
	animation: fadeInOut 5s ease-in-out;

	@keyframes fadeInOut {
		0% { opacity: 0; transform: translateY(-10px); }
		10% { opacity: 1; transform: translateY(0); }
		90% { opacity: 1; transform: translateY(0); }
		100% { opacity: 0; transform: translateY(-10px); }
	}
`;

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
`;

const AlarmBadge = styled(Badge)`
  && .MuiBadge-badge {
    background-color: #d32f2f;
    color: white;
  }
`;

const NotificationMenu = styled(Menu)`
	&& .MuiPaper-root {
		width: 360px;
		display: flex;
		align-items: stretch;
		overflow-y: auto;
	}

	&& .MuiPaper-root::-webkit-scrollbar {
    display: none;
  }

	&& .MuiMenu-list {
    padding: 0;
  }
`

const NotificationItem = styled(MenuItem)`
  && {
    transition: background-color 0.3s ease;
    padding: 10px 0px 0px 10px;
		align-items: flex-start;

    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

const ItemContent = styled.div`
	margin: 23px 0px 0px 5px;
`


export default TopBar;