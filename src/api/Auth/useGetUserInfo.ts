import { useCallback, useState } from "react";
import { User } from "../../type/userType";
import axiosInstance from "../axiosInstance";

const useGetUserInfo = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const getUserInfo = useCallback(async (userId: string | number): Promise<User> => {
    {
      try {
        const response = await axiosInstance.get<User>(`/users/${userId}`);
        setUserInfo(response.data);
        return response.data; // ✅ 반환 추가
      } catch (error) {
        console.error("유저 정보 불러오기 중 오류 발생", error);
        throw error;
      }
    }
  }, []);


  return { userInfo, getUserInfo };
};

export default useGetUserInfo;