import axiosInstance from "../axiosInstance";

const useLikePost = () => {
  const likePost = async (postId: string | number) => {
    await axiosInstance.put(`/posts/${postId}/like`)
      .then(() => console.log("게시물 좋아요 성공"))
      .catch(error => console.error("게시물 좋아요 시도 중 오류 발생", error));
  }

  return likePost;
}

export default useLikePost;