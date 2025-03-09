import axiosInstance from "../axiosInstance";

const useSetNotificationRead = () => {
  const setNotificationRead = async (alertId: string | number) => {
    try {
      await axiosInstance.patch(`/notification/${alertId}/read`);
    } catch (error) {
      console.error("알림 보기 실패", error);
    }
  }

  return setNotificationRead;
}

export default useSetNotificationRead;