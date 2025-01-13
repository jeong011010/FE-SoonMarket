import axios from "axios";
import { useCallback, useState } from "react";
import { useCookies } from "react-cookie";
import { User } from "../../type/userType";

const useGetUserInfo = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [cookies] = useCookies(["access_token"]);
  const token = cookies.access_token;
  console.log("userInfo 호출");
  const getUserInfo = useCallback(async (userId: string | number) => {
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
  }, [token]);

  return { userInfo, getUserInfo };
};

export default useGetUserInfo;