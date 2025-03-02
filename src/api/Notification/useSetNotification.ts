import axiosInstance from "../axiosInstance"

const useSetNotification = () => {
  const setNotification = async (isGranted: boolean) => {
    if (isGranted) {
      await axiosInstance.put(`${import.meta.env.VITE_API_URL}/notification/allow`)
        .catch(error => {
          console.error("알림 허용 실패:", error)
        })
    }
  }
  return setNotification;
}

export default useSetNotification;