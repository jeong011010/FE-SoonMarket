import axios from "axios";
import { Cookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsAuthenticated, setRole, setUserId } from "../../redux/modules/auth";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
	sub?: string; // userId
	auth?: string; // role
	[key: string]: any;
}

function extractTokenData(token: string): {userId: string; role:string;} | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
		console.log(decoded);
		return {
      userId: decoded.sub || "",
      role: decoded.auth || "",
    };
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null; // 디코딩 실패 시 null 반환
  }
}

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
				httpOnly: false,
				secure: false,
				sameSite: "strict",
			})
			const tokenData = extractTokenData(token);
        if (tokenData) {
          const { userId, role } = tokenData;

          // Redux 상태 업데이트
          dispatch(setIsAuthenticated(true));
          dispatch(setUserId(userId));
          dispatch(setRole(role));
        }
			navigate("/main");
		}).catch(error => {
			dispatch(setIsAuthenticated(false));
			alert("로그인 실패" + error);
		})
	};

	return login;
};

export default useLogin;