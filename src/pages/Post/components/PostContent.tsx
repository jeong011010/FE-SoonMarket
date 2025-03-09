import styled from "styled-components";
import { Post } from "../../../type/postType";

const PostContent: React.FC<{ post: Post }> = ({ post }) => {

  const formattedPrice = new Intl.NumberFormat('ko-KR').format(post.price);
  return (
    <ContentBox>
      <TitleBox>
        <Title>
          <h2 style={{ margin: 0 }}>{post?.title}</h2>
          <p style={{ margin: 0 }}>{post?.createAt}</p>
        </Title>
        <Price>
          {formattedPrice}원
        </Price>
      </TitleBox>
      <p>{post?.content}</p>
    </ContentBox>
  )
}

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
`;


const Price = styled.p`
  padding: 0px 20px;
  font-weight: bold;
`

export default PostContent;