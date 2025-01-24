import axios from "axios";
import { useCookies } from "react-cookie"

const useReport = () => {
  const [cookies] = useCookies(["access_token"]);
  const token = cookies.access_token;

  const report = async (postId: string, content: string, categoryId: number) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    await axios.post(`${apiUrl}/posts/${postId}/report`, {
      category: categoryId,
      content,
    }, {
      headers: {
        Authorization: `${token}`,
      },
    }).then(() => console.log("신고 성공"))
      .catch(error => console.error("신고 도중 오류 발생", error));
  }

  return report;
}

export default useReport;