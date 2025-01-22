import axios from "axios";

interface PasswordUpdateRequest {
    newPassword: string;
}

interface ResetPasswordRequest {
    token: string;
    passwordUpdateRequest: PasswordUpdateRequest;
}

interface ConfirmationResponse {
    message: string;
}

const useChangePassword = () => {
    const apiUrl = import.meta.env.VITE_API_URL as string;

    const resetPassword = async (token: string, newPassword: string): Promise<string> => {
        try {
            const passwordUpdateRequest: PasswordUpdateRequest = { newPassword };
            const requestBody: ResetPasswordRequest = {
                token,
                passwordUpdateRequest,
            };

            // API에 POST 요청을 보냅니다.
            const response = await axios.patch<ConfirmationResponse>(`${apiUrl}/auth/reset-password`, requestBody);
            return response.data.message; 
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(`Error: ${error.response.data}`);
            }
            throw new Error('예상치 못한 오류가 발생했습니다.');
        }
    };

    return resetPassword;
};

export default useChangePassword;