import axios from "axios";
import { Cookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsAuthenticated } from "../../redux/modules/auth";

const useLogin = () => {
	const apiUrl = import.meta.env.VITE_API_URL as string;
	const cookies = new Cookies();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	
	const login = async (email: string, password: string /*, fcmToken: string | null */): Promise<void> => {
		try {
			const response = await axios.post(`${apiUrl}/users/login`, {
				email,
				password,
				// fcmToken, // FCM 토큰 추가 주석 처리
			});

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
		} catch (error) {
			dispatch(setIsAuthenticated(false));
			const errorMessage = error instanceof Error ? error.message : String(error);
			throw new Error(errorMessage);
		}
	};

	return login;
};

export default useLogin;
