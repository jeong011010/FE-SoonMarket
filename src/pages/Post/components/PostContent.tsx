import styled from "styled-components";
import { Post } from "../../../type/postType";

const PostContent: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <ContentBox>
      <TitleBox>
        <Title>
          <h2 style={{ margin: 0 }}>{post?.title}</h2>
          <p style={{ margin: 0 }}>{post?.createAt}</p>
        </Title>
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

export default PostContent;