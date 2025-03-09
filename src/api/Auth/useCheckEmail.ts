import axios from "axios";

// API 응답 타입 정의
interface CheckEmailRequest {
	email: string;
}

const useCheckEmail = () => {
	const apiUrl = import.meta.env.VITE_API_URL as string;
	const checkEmail = async (email: string): Promise<number> => {
		try {
			const response = await axios.post<CheckEmailRequest>(`${apiUrl}/auth/check-email`, {
				email,
			});
			return response.status;
		} catch (error) {

			if (axios.isAxiosError(error) && error.response) {
				if(error.response.status === 409){
					return error.response.status;
				}
				return error.response.status;
			}
			throw error;
		}
	};

	return checkEmail;
};

export default useCheckEmail;