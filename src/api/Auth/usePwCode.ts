import axios from "axios";

// API 응답 타입 정의
interface LoginResponse {
  accessToken: string;
}

const usePwCode = () => {
  const apiUrl = import.meta.env.VITE_API_URL as string;
  const sendEmail = async (email: string): Promise<void> => {
    try {
      // API 요청
      await axios.post<LoginResponse>(`${apiUrl}/auth/password-send-code`, {
        email,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "로그인에 실패했습니다.";
        alert(message);
      }
    }
  };

  return sendEmail;
};

export default usePwCode;