import { Button, FormControlLabel, IconButton, Switch } from "@mui/material";
import styled from "styled-components";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from "react-router-dom";
import useEditPost from "../../api/Post/useEditPost";
import ProductDescriptionInputBox from "../../components/Post/ProductDescriptionInputBox";
import { useEffect, useState } from "react";
import useGetPost from "../../api/Post/useGetPost";

const EditPostPage: React.FC = () => {
  const navigate = useNavigate();
  const editPost = useEditPost();
  const { id } = useParams();
  const { post, getPost } = useGetPost();

  const [description, setDescription] = useState({
    title: "",
    content: "",
    price: 0,
    category: "",
    openchatUrl: "",
    sold: false,
  });

  useEffect(() => {
    if(id)
      getPost(id); // id를 기반으로 게시물 가져오기
  }, [getPost, id]);

  useEffect(() => {
    if (post) {
      setDescription({
        title: post.title || "", // undefined 방지
        content: post.content || "",
        price: post.price ?? 0,
        category: post.category || "",
        openchatUrl: post.openchatUrl || "",
        sold: post.isSold ?? false, // 서버에서 sold 필드 사용
      });
    }
  }, [post]);

  // 모든 필드가 채워져 있는지 확인하는 함수
  const isFormComplete = () => {
    return (
      description.title.trim() !== "" &&
      description.content.trim() !== "" &&
      description.price > 0 &&
      description.category.trim() !== "" &&
      description.openchatUrl.trim() !== ""
    );
  };

  const toggleSoldStatus = () => {
    setDescription((prev) => ({
      ...prev,
      sold: !prev.sold, // true <-> false 전환
    }));
  };

  const handleEditPost = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!post) return;

    const requestData = {
      title: description.title,
      content: description.content,
      price: description.price,
      category: description.category,
      openchatUrl: description.openchatUrl,
      sold: description.sold,
    };

    try {
      await editPost(post.postId, requestData);
    } catch (error) {
      console.error("게시물 수정 실패:", error);
    }
  };
  return (
    <AddPostContainer>
      <Header>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Title>게시글 수정</Title>
      </Header>
      <ContentContainer>
        <ProductDescriptionInputBox
          description={description}
          setDescription={setDescription}
        />
        <FormControlLabel
          control={
            <Switch
              checked={description.sold}
              onChange={toggleSoldStatus}
              color="primary"
            />
          }
          label={description.sold ? "판매 완료" : "판매 중"}
          style={{ marginTop: "10px", fontWeight: "bold" }}
        />
        <StyledButton
          variant="contained"
          onClick={handleEditPost}
          disabled={!isFormComplete()} // 모든 필드와 업로드 이미지 조건이 충족되지 않으면 비활성화
        >
          수정 완료
        </StyledButton>
      </ContentContainer>
    </AddPostContainer>
  );
};


const AddPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100dvh;
  
`;

const Header = styled.div`
  display: flex;
  align-items: center; 
  position: relative; 
  padding: 5px 0;
  border-bottom: solid 1px gray; 
  width: 100%; 
  background-color: white;
  z-index: 10;

  & > button {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Title = styled.div`
  flex-grow: 1;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  padding: 10px;
`;

const ContentContainer = styled.div`
  text-align: -webkit-center;
  flex-grow: 1;
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  overflow-y: auto; /* 세로 스크롤 허용 */
  overflow-x: hidden; /* 좌우 스크롤 방지 */
  padding: 0 40px; /* 좌우 여백 */
  box-sizing: border-box; /* 패딩을 포함한 크기 계산 */

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledButton = styled(Button)`
  && {
    width: 100%;
    max-width: 430px; /* 텍스트 필드와 동일한 최대 너비 */
    margin: 15px 0; /* 위아래 간격 */
    box-sizing: border-box; /* 패딩 포함 크기 계산 */
  }
`;
export default EditPostPage;