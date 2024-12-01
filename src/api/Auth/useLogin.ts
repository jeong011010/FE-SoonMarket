import axios from "axios";
import { Cookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsAuthenticated } from "../../redux/modules/auth";

const useLogin = () => {
	const apiUrl = import.meta.env.VITE_API_URL as string; // 환경 변수가 존재한다고 가정
	const cookies = new Cookies();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const login = async (email: string, password: string): Promise<void> => {
		await axios.post(`${apiUrl}/users/login`, {
			email,
			password,
		}).then(response => {
			const token = response.data.accessToken;
			cookies.set("access_token", token, {
				path: "/",
				httpOnly: true,
				secure: true,
				sameSite: "strict",
			})
			dispatch(setIsAuthenticated(true));
			navigate("/main");
		}).catch(error => {
			dispatch(setIsAuthenticated(false));
			alert("로그인 실패" + error);
		})
	};

	return login;
};

export default useLogin;