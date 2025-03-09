import { useCallback, useState } from "react";
import { NotificationType } from "../../type/notificationType";
import axiosInstance from "../axiosInstance";

const useGetNotificationList = () => {
	const [notificationList, setNotificationList] = useState<NotificationType[]>([]);

	const getNotificationList = useCallback(async () => {
		await axiosInstance.get("/notification")
			.then((response) => {
				setNotificationList(response.data.reverse());
			})
			.catch((error) => {
				console.error("알림 목록 가져오기 오류", error);
			});
	}, []);

	return { notificationList, getNotificationList };
};

export default useGetNotificationList;