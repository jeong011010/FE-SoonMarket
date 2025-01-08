import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, IconButton } from "@mui/material";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState, TouchEvent } from "react";
import useGetPost from "../../api/Post/useGetPost";

const PostPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { post, getPost } = useGetPost();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [touchStartX, setTouchStartX] = useState<number>(0);
  const [touchEndX, setTouchEndX] = useState<number>(0);

  useEffect(() => {
    if (id) {
      getPost(id);
    }
  }, [getPost, id]);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      // Next image
      if (post?.images && currentImageIndex < post.images.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
      }
    } else if (touchStartX - touchEndX < -50) {
      // Previous image
      if (currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1);
      }
    }
  };
  return (
    <PostContainer>
      <IconButton
        onClick={() => navigate(-1)}
        style={{ position: "fixed", top: 0, left: 0, margin: "10px", zIndex: 100 }}
      >
        <ArrowBackIcon />
      </IconButton>
      <ImageContainer
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {
          post && post?.images?.length > 0 ? (
            post.images.length > 1 ? (
              <SliderWrapper currentIndex={currentImageIndex}>
                {post.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.imageUrl}
                    alt={`게시글 사진 ${index + 1}`}
                    style={{ width: 390, height: 400 }}
                  />
                ))}
              </SliderWrapper>
            ) : (
              <img
                src={post.images[0].imageUrl}
                alt="게시글 사진"
                style={{ width: "100%", height: "100%" }}
              />
            )
          ) : (
            <div style={{ width: "100%", height: "100%" }}>Soon-Market</div>
          )
        }
      </ImageContainer>
      <UserBox>
        <ProfileImg />
        <ProfileText>
          <p style={{ margin: 1 }}>이름</p>
          <p style={{ margin: 1 }}>신고 횟수 0</p>
        </ProfileText>
        <BtnBox>
          <IconButton>
            <FavoriteBorderIcon fontSize="large" />
          </IconButton>
          <IconButton>
            <ReportGmailerrorredIcon fontSize="large" />
          </IconButton>
        </BtnBox>
      </UserBox>
      <ContentBox>
        <TitleBox>
          <Title>
            <h2 style={{ margin: 0 }}>{post?.title}</h2>
            <p style={{ margin: 0 }}>{post?.createAt}</p>
          </Title>
          <Price>
            <h2 style={{ margin: 10 }}>{post?.price}</h2>
          </Price>
        </TitleBox>
        <p>{post?.content}</p>
      </ContentBox>
      <BottomBtnBox>
        <BottomBtn
          variant="contained"
          onClick={() => window.open("https://open.kakao.com/o/sftW1KOg")}
        >
          오픈 채팅으로 거래하기
        </BottomBtn>
      </BottomBtnBox>
    </PostContainer>
  );
};

const ImageContainer = styled.div`
  position: relative;
  width: 390px;
  height: 400px;
  overflow: hidden;
`;

const SliderWrapper = styled.div<{ currentIndex: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ currentIndex }) => `translateX(-${currentIndex * 100}%)`};
`;

const PostContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
`;

const UserBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileImg = styled.div`
  width: 70px;
  height: 70px;
  background: gray;
  margin: 10px;
`;

const ProfileText = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px 0px;
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 10px 0px auto;
`;

const ContentBox = styled.div`
  width: 380px;
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

const Price = styled.div`
  width: auto;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #bdd9f2;
  border-radius: 30px;
  margin: 10px;
`;

const BottomBtnBox = styled.div`
  width: 100%;
  height: 60px;
  background: white;
  position: fixed;
  bottom: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1);
`;

const BottomBtn = styled(Button)`
  width: 95%;
  height: 40px;
  && {
    background-color: #bdd9f2;
    color: #000;
  }
`;

export default PostPage;