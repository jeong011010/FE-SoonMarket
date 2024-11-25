import axios from "axios";

// API 응답 타입 정의
interface LoginResponse {
    accessToken: string;
}

const useSendEmail = () => {
    const apiUrl = import.meta.env.VITE_API_URL as string;
    const sendEmail = async (email: string): Promise<void> => {
        try {
            // API 요청
            const response = await axios.post<LoginResponse>(`${apiUrl}/auth/send-code`, {
                email,
            });

        } catch (error) {

            // 에러 메시지 사용자에게 표시 (선택 사항)
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "로그인에 실패했습니다.";
                alert(message);
            }
        }
    };

    return sendEmail;
};

export default useSendEmail;