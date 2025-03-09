import { Button, IconButton } from "@mui/material";
import styled from "styled-components";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import useAddPost from "../../api/Post/useAddPost";
import { useState } from "react";
import UploadImgBox from "./components/UploadImgBox";
import ProductDescriptionInputBox from "../../components/Post/ProductDescriptionInputBox";

// UploadImgBox에서 사용하는 타입 가져오기
interface UploadedImage {
  id: string;
  url: string;
  file: File;
}

const AddPostPage: React.FC = () => {
  const navigate = useNavigate();
  const addPost = useAddPost();

  const [uploadImg, setUploadImg] = useState<UploadedImage[]>([]);
  const [description, setDescription] = useState({
    title: "",
    content: "",
    price: 0,
    category: "",
    sold: false,
  });

  // 모든 필드가 채워져 있는지 확인하는 함수
  const isFormComplete = () => {
    return (
      uploadImg.length > 0 && // 업로드된 이미지가 1개 이상인지 확인
      description.title.trim() !== "" &&
      description.content.trim() !== "" &&
      description.price > 0 && // 가격이 양수여야 한다고 가정
      description.category.trim() !== ""
    );
  };

  const handleAddPost = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const formData = new FormData();

    // 바로 uploadImg에서 파일 객체를 추출하여 formData에 추가
    uploadImg.forEach((imageFile) => {
      formData.append("file", imageFile.file); // 파일 객체 추가
    });

    formData.append(
      "request",
      new Blob([JSON.stringify(description)], { type: "application/json" })
    );
    // 게시글 추가 함수 호출
    addPost(formData);
  };

  return (
    <AddPostContainer>
      <Header>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Title>물건 등록</Title>
      </Header>
      <ContentContainer>
        <UploadImgBox uploadImg={uploadImg} setUploadImg={setUploadImg} />
        <ProductDescriptionInputBox
          description={description}
          setDescription={setDescription}
        />
        <StyledButton
          variant="contained"
          onClick={handleAddPost}
          disabled={!isFormComplete()} // 모든 필드와 업로드 이미지 조건이 충족되지 않으면 비활성화
        >
          게시물 등록
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
export default AddPostPage;