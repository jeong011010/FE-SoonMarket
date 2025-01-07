import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import useGetUserInfo, { UserInfo } from "../../api/Auth/useGetUserInfo";
import useEditProfile from "../../api/Auth/useEditProfile";

const EditProfilePage: React.FC = () => {
  const { userInfo, getUserInfo } = useGetUserInfo();
  const [name, setName] = useState<string>(userInfo?.name || "");
  const [phone, setPhone] = useState<string>(userInfo?.phone || "");
  const [openchatUrl, setOpenchatUrl] = useState<string>(userInfo?.openchatUrl || "");
  const [nickname, setNickname] = useState<string>(userInfo?.nickname || "");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const editProfile = useEditProfile();

  useEffect(() => {
    if (!userInfo) {
      getUserInfo(); // 사용자 정보를 초기 호출
    } else {
      // userInfo가 변경되면 상태 업데이트
      setName(userInfo.name || "");
      setPhone(userInfo.phone || "");
      setOpenchatUrl(userInfo.openchatUrl || "");
      setNickname(userInfo.nickname || "");
      setPreviewImage(userInfo.image?.imageUrl || null); // 기존 프로필 이미지
    }
  }, [userInfo, getUserInfo]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file)); // 이미지 미리 보기 설정
    }
  };

  const handleSubmit = async () => {
    const requestData = {
      name: name,
      phone: phone,
      email: userInfo?.email,
      nickname: nickname,
      categoryIds: [], // 선택된 카테고리가 없으면 기본값
      openchatUrl: openchatUrl,
    };

    const formData = new FormData();
    formData.append(
      "request",
      new Blob([JSON.stringify(requestData)], { type: "application/json" })
    );
    if (selectedImage) {
      formData.append("file", selectedImage); // 선택된 이미지 추가
    }

    try {
      await editProfile(formData);
      alert("프로필이 성공적으로 수정되었습니다.");
      navigate("/mypage");
    } catch (error) {
      console.error("프로필 수정 중 오류 발생", error);
      alert("프로필 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleCancel = () => {
    navigate("/mypage"); // 취소 버튼 클릭 시 이전 페이지로 이동
  };

  return (
    <EditProfileContainer>
      <h2>프로필 수정</h2>
      <Form>
        <ProfileSection>
          <ProfileImgContainer>
            <ProfileImg imageUrl={previewImage ?? undefined} />
            <EditOverlay>
              <EditIcon fontSize="large" />
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </EditOverlay>
          </ProfileImgContainer>
        </ProfileSection>
        <TextField
          label="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="전화번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="오픈채팅 URL"
          value={openchatUrl}
          onChange={(e) => setOpenchatUrl(e.target.value)}
          fullWidth
          margin="normal"
        />
        <ButtonGroup>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            저장
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            취소
          </Button>
        </ButtonGroup>
      </Form>
    </EditProfileContainer>
  );
};

// Styled Components
const EditProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px; /* 텍스트 필드와 간격 조정 */
`;

const ProfileImgContainer = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 3px solid black;
`;

const ProfileImg = styled.div<{ imageUrl?: string }>`
  background: ${(props) => (props.imageUrl ? `url(${props.imageUrl})` : "#ddd")};
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const EditOverlay = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;

  svg {
    color: white;
  }
`;


export default EditProfilePage;