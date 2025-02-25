import axiosInstance from "../axiosInstance";

const useFileUpload = () => {
  const fileUpload = async (roomId: string, formData: FormData) => {
    try {
      const response = await axiosInstance.post(`/chat/room/${roomId}/file/upload`, formData);
      return response.data; // 서버가 이미지 URL을 반환한다고 가정
    } catch (error: any) {
      alert("이미지 업로드 실패");
      return null;
    }
  };

  return { fileUpload };
}

export default useFileUpload;