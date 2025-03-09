import axiosInstance from "../axiosInstance";

const useEditIsSold = () => {

  const editIsSold = async (postId: Number) => {
    try {
      await axiosInstance.put(`/posts/isSold/${postId}`);
    } catch (error) {
      console.error('판매 여부 변경 중 오류 발생', error);
    }
  }

  return editIsSold;
}

export default useEditIsSold;