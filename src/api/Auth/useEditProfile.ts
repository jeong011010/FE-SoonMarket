import axiosInstance from "../axiosInstance";

const useEditProfile = () => {

  const editProfile = async (formData: FormData) => {
    try {
      await axiosInstance.put(`/users/me`, formData);
    } catch (error) {
      console.error("프로필 수정 시도 중 오류 발생", error);
    }
  };

  return editProfile;
};

export default useEditProfile;