import axios from "axios";

// API 응답 타입 정의
interface LoginResponse {
  accessToken: string;
}

const useSendCode = () => {
  const apiUrl = import.meta.env.VITE_API_URL as string;
  const sendCode = async (email: string, authCode: string): Promise<number> => {
    try {
      // API 요청
      const response = await axios.post<LoginResponse>(`${apiUrl}/auth/auth-code`, {
        email,
        code: authCode,
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

  return sendCode;
};

export default useSendCode;