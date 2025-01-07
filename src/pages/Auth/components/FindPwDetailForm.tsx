import React, { useState } from "react";
import styled from "styled-components";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Button, TextField, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../../redux/store";

const ResetPasswordForm: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const email = useSelector((state: RootState) => state.auth.email);

  const validatePassword = (value: string): boolean =>
    /^(?=.*[a-z])(?=.*[\W])(?=.*\d)[a-zA-Z\d\W]{8,16}$/.test(value);

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setPasswordError("");
    setConfirmPasswordError("");

    let hasError = false;

    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
      hasError = true;
    } else if (!validatePassword(password)) {
      setPasswordError("영문, 숫자, 특수문자를 포함 8~16자로 설정해주세요.");
      hasError = true;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      hasError = true;
    }

    if (hasError) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.patch(`users/reset-password`, {
        email,
        passwordUpdateRequest: {
          newPassword: password,
        },
      });
      console.log("비밀번호 재설정 성공:", response.data);
      alert("비밀번호가 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error("비밀번호 재설정 중 오류 발생:", error);
      alert("비밀번호 재설정 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Caps Lock 감지
    if (e.getModifierState("CapsLock") && !isCapsLockOn) {
      setIsCapsLockOn(true);
    } else if (!e.getModifierState("CapsLock") && isCapsLockOn) {
      setIsCapsLockOn(false);
    }
  };

  return (
    <FormContainer>
      {/* 비밀번호 입력 */}
      <TextFieldContainer>
        <StyledTextField
          label="비밀번호"
          variant="filled"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <IconButton onClick={() => setPassword("")}>
          <HighlightOffOutlinedIcon />
        </IconButton>
      </TextFieldContainer>
      {isCapsLockOn && <StatusText>Caps Lock이 켜져있습니다.</StatusText>}
      {passwordError && <ErrorText>{passwordError}</ErrorText>}

      {/* 비밀번호 확인 */}
      <TextFieldContainer>
        <StyledTextField
          label="비밀번호 확인"
          variant="filled"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <IconButton onClick={() => setConfirmPassword("")}>
          <HighlightOffOutlinedIcon />
        </IconButton>
      </TextFieldContainer>
      {confirmPasswordError && <ErrorText>{confirmPasswordError}</ErrorText>}

      {/* 제출 버튼 */}
      <SubmitButton onClick={handleSubmit}>비밀번호 변경</SubmitButton>
    </FormContainer>
  );
};

export default ResetPasswordForm;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextFieldContainer = styled.div`
  display: flex;
  align-items: center;
  background: #bdd9f2;
  width: 350px;
  margin: 20px;
  border-radius: 4px;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  && .MuiFilledInput-root {
    background: #bdd9f2;
  }
  && .MuiFilledInput-underline:before,
  && .MuiFilledInput-underline:after {
    display: none;
  }
`;

const SubmitButton = styled(Button)`
  && {    
    border-radius: 20px;
    width: 350px;
    background: #d9e9f9;
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.75rem;
  text-align: left;
  margin-top: -10px; /* 필드와의 간격 조정 */
  margin-bottom: 10px; /* 아래 콘텐츠와의 간격 조정 */
  width: 350px; /* 필드와 동일한 너비로 확장 */
`;

const StatusText = styled.div`
  color: #888;
  font-size: 0.75rem;
  text-align: left;
  margin-top: -10px;
  margin-bottom: 10px;
  width: 350px;
`;
