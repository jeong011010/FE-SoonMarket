import { useCallback, useState } from "react";
import { User } from "../../type/userType";
import axiosInstance from "../axiosInstance";

const useGetUserInfo = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  console.log("userInfo 호출");
  const getUserInfo = useCallback(async (userId: string | number) => {
    await axiosInstance.get<User>(`/users/${userId}`)
      .then(response => setUserInfo(response.data))
      .catch(error => console.error("유저 정보 불러오기 중 오류 발생", error));
  }, []);

  return { userInfo, getUserInfo };
};

export default useGetUserInfo;