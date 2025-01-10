import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
import { Post } from '../../type/postType';

interface PostProps {
  post: Post
};

const WidePostCard: React.FC<PostProps> = ({ post }) => {
  const uploadTime = new Date(post.createAt);
  const navigate = useNavigate();

  return (
    <DataContainer onClick={() => navigate(`/post/${post.postId}`)}>
      <img src={post.images[0]?.imageUrl} alt="일러스트" style={{ width: 120, height: 120, margin: 10, borderRadius: "5%" }} />
      <Detail>
        <h3 style={{ margin: "20px 0px 5px 0px" }}>{post.title}</h3>
        <p style={{ margin: "5px 0px" }}>{uploadTime.toLocaleString()}</p>
        <p style={{ margin: "5px 0px" }}>{post.price}</p>
        <LikesContainer>
          <ThumbUpAltIcon style={{ fontSize: '20px' }} />
          <LikesText>{post.countLike}</LikesText>
        </LikesContainer>
      </Detail>
    </DataContainer>
  )
}

const DataContainer = styled.div`
  width: 100%;
  display: flex;
`

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`

const LikesContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 10px;
`

const LikesText = styled.span`
  margin-left: 5px;
  font-size: 14px;
`

export default WidePostCard;