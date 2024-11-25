import axios from "axios";

// API 응답 타입 정의
interface CheckEmailRequest {
    email: string;
}

const useCheckEmail = () => {
    const apiUrl = import.meta.env.VITE_API_URL as string;
    const checkEmail = async (email: string): Promise<number> => {
        try {
            // API 요청
            const response = await axios.post<CheckEmailRequest>(`${apiUrl}/auth/check-email`, {
              email,  
            });
            return response.status;
        } catch (error) {

            // 에러 메시지 사용자에게 표시 (선택 사항)
            if (axios.isAxiosError(error) && error.response) {
              return error.response.status;
            }
            throw error;
        }
    };

    return checkEmail;
};

export default useCheckEmail;