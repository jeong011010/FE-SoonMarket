import axiosInstance from "../axiosInstance";

const useSetNotification = () => {
  const setNotification = async (isGranted: boolean) => {
    try {
      await axiosInstance.put(`/notification/allow`, { isGranted }); // 🔹 `true` 또는 `false` 값 전달
    } catch (error) {
      console.error("알림 설정 변경 실패:", error);
    }
  };

  return { setNotification }; // 🔹 객체로 반환 (일관성 유지)
};

export default useSetNotification;