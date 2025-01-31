import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Post } from "../../type/postType";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface PostProps {
  post: Post
}

const PostCard: React.FC<PostProps> = ({ post }) => {
  const navigate = useNavigate();

  return (
    <CardContainer onClick={() => navigate(`/post/${post.postId}`)}>
      <Dot/>
      <ImageContainer>
      <CardImage src={post.images[0]?.imageUrl} alt="일러스트" />
      </ImageContainer>
      <Separator />
      <Title>{post.title}</Title>
      <Details>
        <Price>₩{post.price.toLocaleString()}</Price>
        <VisibilityIcon style={{fontSize:"14px"}}/>
      </Details>
    </CardContainer>
  );
};

// Styled Components
const CardContainer = styled.div`
  width: 140px;
  height: 220px;
  border-radius: 2px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 10px 5px;
  padding: 0px 10px;
  padding-bottom: 20px;
  background-color: white;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 380px) {
    width: 120px;
    height: 190px;
  }
`;


const ImageContainer = styled.div`
  width: 140px;
  height: 140px;
  overflow: hidden;
  position: relative;
  background: #f0f0f0;
  display: flex; /* 이미지와 그림자 모두 중앙에 위치하도록 설정 */
  justify-content: center;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    inset: 0; /* 부모 크기에 맞춤 */
    box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.15); /* 안쪽 그림자 */
    pointer-events: none; /* 상호작용 차단 */
  }

  @media (max-width: 380px) {
    width: 120px;
    height: 120px;
  }
`;

const Dot = styled.div`
  background: #d9d9d9;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 8px auto;
  box-shadow: 1px 1px 1px 0px;
`;

const CardImage = styled.img`
  position: relative; /* 그림자 위로 표시되도록 상대적 위치 유지 */
  width: 140px; /* 박스의 너비 */
  height: 140px; /* 박스의 높이 */
  object-fit: contain; /* 비율 유지하며 박스 안에 맞춤 */
  @media (max-width: 380px) {
    width: 130px;
    height: 130px;
  }
`;

const Separator = styled.div`
  width: 100%;
  height: 2px;
  background-color: #ddd;
  margin: 10px 0;
  border-radius: 1px;
`;

const Title = styled.h4`
  margin: 5px 10px 0 10px;
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 380px) {
    font-size: 12px;
  }
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 10px;
  align-items: center;
`;

const Price = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: bold;
  color: #2d61a6;

  @media (max-width: 380px) {
    font-size: 12px;
  }
`;

export default PostCard;