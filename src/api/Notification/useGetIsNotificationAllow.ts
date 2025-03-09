import { useCallback, useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";

const useGetIsNotificationAllow = () => {
  const [isNotificationAllow, setIsNotificationAllow] = useState<boolean>(false); // ✅ 초기값 `false`

  const getIsNotificationAllow = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/notification/allow");
      setIsNotificationAllow(response.data);
    } catch (error) {
      console.error("알림 허용 여부 가져오기 오류", error);
    }
  }, []);

  useEffect(() => {
    getIsNotificationAllow(); // ✅ 컴포넌트가 마운트될 때 실행
  }, [getIsNotificationAllow]);

  return { isNotificationAllow, getIsNotificationAllow };
};

export default useGetIsNotificationAllow;