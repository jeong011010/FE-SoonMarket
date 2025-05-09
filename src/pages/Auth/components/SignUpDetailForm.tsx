import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Button, TextField, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import useSignUp from "../../../api/Auth/useSignUp";
import { RootState } from "../../../redux/store"; 
// import { requestFCMToken } from "../../../firebase/firebase"; // Firebase 관련 코드 주석 처리

const SignUpDetailForm: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  // const [fcmToken, setFcmToken] = useState<string | null>(null); // FCM 토큰 상태 추가
  const signUp = useSignUp();
  const email = useSelector((state: RootState) => state.auth.email);

  useEffect(() => {
    // FCM 토큰 요청
    // const fetchFCMToken = async () => {
    //   const currentToken = await requestFCMToken();
    //   if (currentToken) {
    //     console.log('발급 받은 FCM 토큰:', currentToken);
    //     setFcmToken(currentToken); // FCM 토큰 상태에 저장
    //   } else {
    //     console.log("No registration token available.");
    //   }
    // };

    // fetchFCMToken();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  const validatePassword = (value: string): boolean =>
    /^(?=.*[a-z])(?=.*[\W])(?=.*\d)[a-zA-Z\d\W]{8,16}$/.test(value);

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setNicknameError("");
    setPasswordError("");
    setConfirmPasswordError("");

    let hasError = false;

    if (!nickname) {
      setNicknameError("닉네임을 입력해주세요.");
      hasError = true;
    } else if (nickname.length < 2 || nickname.length > 8) {
      setNicknameError("닉네임은 2~8자로 설정해주세요.");
      hasError = true;
    }

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
      // if (fcmToken) {
      //   await signUp(email, password, nickname, fcmToken); // FCM 토큰을 signUp에 전달
      // } else {
      //   console.error("받아온 FCM 토큰이 없습니다.");
      //   // 여기에 에러 처리 로직을 추가할 수 있습니다.
      // }
      await signUp(email, password, nickname); // FCM 토큰 없이 회원가입 호출
      
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Caps Lock 감지
    setIsCapsLockOn(e.getModifierState("CapsLock"));
  };

  return (
    <FormContainer>
      {/* 닉네임 입력 */}
      <TextFieldContainer>
        <StyledTextField
          label="닉네임"
          variant="filled"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <IconButton onClick={() => setNickname("")}>
          <HighlightOffOutlinedIcon />
        </IconButton>
      </TextFieldContainer>
      {nicknameError && <ErrorText>{nicknameError}</ErrorText>}

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
      <SubmitButton onClick={handleSubmit}>회원가입</SubmitButton>
    </FormContainer>
  );
};

export default SignUpDetailForm;

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
