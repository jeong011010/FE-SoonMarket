import React, { useRef, useState } from "react";
import styled from "styled-components";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ImageCropPopup from "./ImageCropPopup";

// 업로드된 이미지 타입 정의
interface UploadedImage {
  id: string;
  url: string;
  file: File;
}

interface UploadImgBoxProps {
  uploadImg: UploadedImage[];
  setUploadImg: React.Dispatch<React.SetStateAction<UploadedImage[]>>;
}

const UploadImgBox: React.FC<UploadImgBoxProps> = ({ uploadImg, setUploadImg }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const resizedImage = await resizeImage(files[0]);
      setSelectedImage(resizedImage);
      setPreviewUrl(URL.createObjectURL(resizedImage));
    }
    e.target.value = ""; // 초기화
  };

  const resizeImage = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      createImageBitmap(file).then((bitmap) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const targetWidth = 1200; // 더 높은 해상도로 작업
        const targetHeight = 1200;

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const imageAspect = bitmap.width / bitmap.height;
        const canvasAspect = targetWidth / targetHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imageAspect > canvasAspect) {
          drawWidth = targetWidth;
          drawHeight = targetWidth / imageAspect;
          offsetX = 0;
          offsetY = (targetHeight - drawHeight) / 2;
        } else {
          drawHeight = targetHeight;
          drawWidth = targetHeight * imageAspect;
          offsetX = (targetWidth - drawWidth) / 2;
          offsetY = 0;
        }

        if (ctx) {
          ctx.fillStyle = "#f0f0f0"; // 배경색
          ctx.fillRect(0, 0, targetWidth, targetHeight);

          ctx.drawImage(bitmap, offsetX, offsetY, drawWidth, drawHeight);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const resizedFile = new File([blob], file.name, { type: file.type });
                resolve(resizedFile);
              }
            },
            "image/jpeg",
            1 // 최대 품질
          );
        }
      });
    });
  };

  const handleCropComplete = (croppedFile: File) => {
    const croppedImage = {
      id: croppedFile.name + croppedFile.size,
      url: URL.createObjectURL(croppedFile),
      file: croppedFile,
    };

    setUploadImg((prev) => [...prev, croppedImage].slice(0, 10));
    setSelectedImage(null);
    setPreviewUrl("");
  };

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDeleteImage = (id: string) => {
    setUploadImg((prev) => prev.filter((image) => image.id !== id));
  };

  return (
    <>
      {selectedImage && (
        <ImageCropPopup
          src={previewUrl}
          onClose={() => {
            setSelectedImage(null);
            setPreviewUrl("");
          }}
          onCropComplete={handleCropComplete}
        />
      )}
      <ImageGrid>
        {uploadImg.length < 10 && (
          <ImageInputBox onClick={handleBoxClick}>
            <CameraAltOutlinedIcon style={{ fontSize: "60px", margin: "30px 0px 5px 0px" }} />
            <h4 style={{ margin: 0 }}>{uploadImg.length}/10</h4>
            <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} />
          </ImageInputBox>
        )}
        {uploadImg.map((imgFiles) => (
          <ImageWrapper key={imgFiles.id}>
            <DeleteButton onClick={() => handleDeleteImage(imgFiles.id)}>
              <CloseIcon style={{ fontSize: "14px" }} />
            </DeleteButton>
            <ImagePreview src={imgFiles.url} alt="uploaded-image" />
          </ImageWrapper>
        ))}
      </ImageGrid>
    </>
  );
};


export default UploadImgBox;

// Styled Components
const ImageGrid = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
  width: 100%;
  padding-bottom: 10px;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ImageInputBox = styled.div`
  width: 150px;
  height: 150px;
  background: #cccccc;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  flex-shrink: 0; //아이템 강제 축소 막기

  input[type="file"] {
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  left: 5px;
  background-color: rgba(200, 200, 200, 0.6);
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;

  &:hover {
    background-color: rgba(150, 150, 150, 0.8);
  }

  svg {
    color: black;
  }
`;

const ImagePreview = styled.img`
  width: 150px;
  height: 150px;
  margin: 10px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
`;