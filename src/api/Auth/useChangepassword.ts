import axios from "axios";

const useChangePassword = () => {
  const apiUrl = import.meta.env.VITE_API_URL as string;
  /**
   * 비밀번호를 재설정하는 함수입니다.
   * @param token - 비밀번호 리셋을 위한 토큰
   * @param newPassword - 새로 설정할 비밀번호
   * @returns 성공 시 확인 메시지 문자열을 반환합니다.
   */
  const resetPassword = async (token: string, newPassword: string): Promise<string> => {
    try {
    
      console.log(newPassword);
      const response = await axios.patch<string>(
        `${apiUrl}/auth/reset-password`,
        newPassword,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data; 
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        
        throw new Error(`Error: ${error.response.data}`);
      }
     
      throw new Error("예상치 못한 오류가 발생했습니다.");
    }
  };

    return resetPassword;
};

export default useChangePassword;
