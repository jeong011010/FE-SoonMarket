import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { User } from "../../type/userType";

const useGetUserInfo = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [cookies] = useCookies(["access_token"]);
  const token = cookies.access_token;
  const userId = useSelector((state: RootState) => state.auth.userId);
  console.log("userInfo 호출");
  const getUserInfo = useCallback(async () => {
    if (!token || !userId) {
      console.error("Missing token or userId");
      return;
    }

    try {
      const response = await axios.get<User>(
        `${import.meta.env.VITE_API_URL}/users/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  }, [token, userId]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return { userInfo, getUserInfo };
};

export default useGetUserInfo;