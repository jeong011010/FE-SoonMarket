import axios from "axios";

interface ConfirmationResponse {
    message: string;
}

const useConfirmToken = () => {
    const apiUrl = import.meta.env.VITE_API_URL as string;

    const confirmToken = async (token: string): Promise<string> => {
        try {
            const response = await axios.get<ConfirmationResponse>(`${apiUrl}/auth/confirm`, {
                params: { token },
            });
            return response.data.message;
        } catch (error) {
            // 에러 처리
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(`Error: ${error.response.data}`);
            }
            throw new Error('예상치 못한 오류가 발생했습니다.');
        }
    };

    return confirmToken;
};

export default useConfirmToken;