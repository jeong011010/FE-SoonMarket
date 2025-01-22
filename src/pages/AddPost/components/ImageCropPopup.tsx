import React, { useState, useRef } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import styled from "styled-components";

interface ImageCropPopupProps {
  src: string;
  onClose: () => void;
  onCropComplete: (croppedFile: File) => void;
}

const ImageCropPopup: React.FC<ImageCropPopupProps> = ({ src, onClose, onCropComplete }) => {
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleImageLoad = (img: HTMLImageElement) => {
    imgRef.current = img;
  };

  const generateCroppedImage = async () => {
    if (!completedCrop || !imgRef.current || !previewCanvasRef.current) {
      return;
    }

    const canvas = previewCanvasRef.current;
    const image = imgRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = completedCrop.width!;
    canvas.height = completedCrop.height!;

    ctx.drawImage(
      image,
      completedCrop.x! * scaleX,
      completedCrop.y! * scaleY,
      completedCrop.width! * scaleX,
      completedCrop.height! * scaleY,
      0,
      0,
      completedCrop.width!,
      completedCrop.height!
    );

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], "cropped-image.jpg", { type: "image/jpeg" });
          onCropComplete(file);
          onClose();
        }
      },
      "image/jpeg",
      1
    );
  };

  return (
    <PopupOverlay>
      <PopupContainer>
        <h2>이미지 자르기</h2>
        <CropWrapper>
          <ReactCrop
            style={{maxWidth:"400px", maxHeight:"400px"}}
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={(newCrop) => setCompletedCrop(newCrop)}
            aspect={1} // 1:1 비율 유지
          >
            <CropImage
              src={src}
              onLoad={(e) => handleImageLoad(e.currentTarget)}
              alt="Crop preview"
            />
          </ReactCrop>
        </CropWrapper>
        <CanvasPreview ref={previewCanvasRef} style={{ display: "none" }} />
        <ButtonContainer>
          <button onClick={onClose}>취소</button>
          <button onClick={generateCroppedImage}>저장</button>
        </ButtonContainer>
      </PopupContainer>
    </PopupOverlay>
  );
};

export default ImageCropPopup;

// Styled Components
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 350px;
  max-height: 550px;
  text-align: center;
  overflow: hidden;
`;

const CanvasPreview = styled.canvas`
  display: none;
`;

const CropWrapper = styled.div`
  width: 100%; /* wrapper의 너비 */
  max-width: 90%; /* 팝업의 최대 너비 */
  max-height: 60vh; /* 팝업의 최대 높이 */
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;
  background-color: #f9f9f9; /* 배경색 (여백 강조) */
`;

const CropImage = styled.img`
  object-fit: contain; /* 이미지 비율 유지 */
`;


const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: #0056b3;
    }
  }
`;