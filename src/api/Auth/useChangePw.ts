import axiosInstance from "../axiosInstance";

const useChangePassword = () => {

  const changePassword = async (newPassword: string): Promise<void> => {
    try {
      await axiosInstance.patch(`/users/change-password`, {newPassword});
    } catch (error) {
      console.error("비밀번호 수정 중 오류 발생", error);
    }
  }
  return changePassword;
};

export default useChangePassword;