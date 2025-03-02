import axios from "axios";
import { Cookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsAuthenticated } from "../../redux/modules/auth";
import { getFCMToken } from "../../firebaseConfig";  // 🔹 FCM 토큰 가져오는 함수 추가

const useLogin = () => {
	const apiUrl = import.meta.env.VITE_API_URL as string;
	const cookies = new Cookies();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const login = async (email: string, password: string): Promise<void> => {
		const fcmToken = await getFCMToken();  // 🔹 FCM 토큰 가져오기
		await axios.post(`${apiUrl}/users/login`, {
			email,
			password,
			fcmToken,
		}).then((response) => {
			const accessToken = response.data.accessToken;
			const refreshToken = response.data.refreshToken;

			cookies.set("access_token", accessToken, {
				path: "/",
				httpOnly: false,
				secure: false,
				sameSite: "strict",
			});
			cookies.set("refresh_token", refreshToken, {
				path: "/",
				httpOnly: false,
				secure: false,
				sameSite: "strict",
			});

			dispatch(setIsAuthenticated(true));
			navigate("/main");
		}).catch((error) => {
			dispatch(setIsAuthenticated(false));
			console.error("로그인 실패:", error);
		});
	};
	return login;
};

export default useLogin;