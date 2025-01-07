import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export interface UserInfo {
  id: number;
  name: string;
  phone: string;
  email: string;
  password: string;
  nickname: string;
  image: {
    imageUrl: string;
    originalName: string;
  };
  preferredCategories: number[];
  openchatUrl: string;
  reportCount: number;
}

const useGetUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [cookies] = useCookies(["access_token"]);
  const token = cookies.access_token;
  const userId = useSelector((state: RootState) => state.auth.userId);

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
      const response = await axios.get<UserInfo>(`${apiUrl}/users/${userId}`);
      setUserInfo(response.data);
      console.log("User information fetched successfully.");
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  }, [token]);
  console.log(userInfo);
  return { userInfo, getUserInfo };
};

export default useGetUserInfo;