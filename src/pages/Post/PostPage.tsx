import { useParams } from "react-router-dom";
import useGetPost from "../../api/Post/useGetPost";
import TopBar from "../../components/Layout/TopBar";
import { useEffect } from "react";

const PostPage: React.FC = () => {
  const { id } = useParams();
  const { post, getPost } = useGetPost();

  useEffect(() => {
    if (id) {
      getPost(id);
    }
  }, [id, getPost]);

  return (
    <div>
      <TopBar />
    </div>
  )
}

export default PostPage;