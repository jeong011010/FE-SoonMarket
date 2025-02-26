import axios from "axios";
import { useNavigate } from "react-router-dom";

// API 응답 타입 정의
interface SignUpRequest {
	email: string;
	password: string;
	nickname: string;
	//fcmToken: string;
}

const useSignUp = () => {
	const apiUrl = import.meta.env.VITE_API_URL as string;
	const navigate = useNavigate();

	const signUp = async (
		email: string,
		password: string,
		nickname: string,
		//fcmToken: string 
	): Promise<void> => {
		try {
			

			const requestData: SignUpRequest = {
				email, // 필수값
				password, // 필수값
				nickname, // 필수값
				//fcmToken, 
			};

			// FormData 생성
			const formData = new FormData();
			formData.append("request", new Blob([JSON.stringify(requestData)], { type: "application/json" })); // JSON 데이터를 문자열로 추가

			// 빈 파일 추가 (Content-Type만 지정)
			formData.append("file", new Blob([], { type: "image/jpeg" }));


			// API 요청
			await axios.post(`${apiUrl}/users/signup`, formData)
				.then(() => navigate("/"));
		} catch (error) {
			// 에러 메시지 사용자에게 표시 (선택 사항)
			if (axios.isAxiosError(error)) {
				const message = error.response?.data?.message || "회원가입에 실패했습니다.";
				alert(message);
			}
		}
	};

	return signUp;
};

export default useSignUp;
