import axios from "axios";
import { useCookies } from "react-cookie";

const useEditProfile = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [cookies] = useCookies(['access_token']);
  const token = cookies.access_token;

  const editProfile = async (postId: string) => {
    try {
      console.log('프로필 수정 시도', postId);
      await axios.put(`${apiUrl}/users/me`,{}, {
        headers: {
          Authorization: `${token}`
        },
      });
      console.log('프로필 수정 성공');
    } catch (error) {
      console.error('프로필 수정 시도 중 오류 발생', error);
    }
  }

  return editProfile;
}

export default useEditProfile;