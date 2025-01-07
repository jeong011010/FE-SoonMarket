import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export interface UserInfo {
  id?: string;
  nickname?: string;
  name?: string;
  phone?: string;
  openchatUrl?: string;
  image?: {
    imageUrl: string;
  };
}

const useGetUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [cookies] = useCookies(["access_token"]);
  const token = cookies.access_token;

  useEffect(() => {
    if (!token) {
      console.warn("Access token is missing!");
    }
  }, [token]);

  const getUserInfo = useCallback(async () => {
    const apiUrl = import.meta.env.VITE_API_URL as string;
    if (!token) {
      console.error("Cannot fetch user info without a valid token.");
      return;
    }

    try {
      const response = await axios.get<UserInfo>(`${apiUrl}/users/1`);
      setUserInfo(response.data);
      console.log("User information fetched successfully.");
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  }, [token]);

  return { userInfo, getUserInfo };
};

export default useGetUserInfo;