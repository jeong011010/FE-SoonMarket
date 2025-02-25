import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Button, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useCheckEmail from "../../../api/Auth/useCheckEmail";
import useSendCode from "../../../api/Auth/useSendCode";
import useSendEmail from "../../../api/Auth/useSendEmail";
import { setUserEmail } from "../../../redux/modules/auth";

interface SignUpEmailFormProps {
  onNext: () => void;
}

const SignUpEmailForm: React.FC<SignUpEmailFormProps> = ({ onNext }) => {
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const sendEmail = useSendEmail();
  const sendCode = useSendCode();
  const checkEmail = useCheckEmail();

  const validateEmail = (value: string) => /^[a-zA-Z0-9._%+-]+@sch\.ac\.kr$/.test(value);
  const dispatch = useDispatch();

  const handleEmailBlur = () => {
    setEmailError(!email ? "" : !validateEmail(email) ? "이메일은 @sch.ac.kr 도메인만 허용됩니다." : "");
  };

  const handleSendEmail = async () => {
    if (!validateEmail(email)) {
      setEmailError("이메일은 @sch.ac.kr 도메인만 허용됩니다.");
      return;
    }
    if (email === "") {
      setEmailError("이메일을 입력해주세요.");
      return;
    }

    setEmailError("");
    setIsSending(true);

    try {
      const statusCode = await checkEmail(email);
      if (statusCode !== 200) {
        setEmailError("이미 사용중인 이메일입니다.");
        setIsSending(false);
        return;
      }
      await sendEmail(email);
      setIsEmailSent(true);
    } catch {
      setIsEmailSent(false);
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!authCode) {
      setCodeError("인증 번호를 입력해주세요.");
      return;
    } try {
      const statusCode = await sendCode(email, authCode);
      if (statusCode === 200) {
        dispatch(setUserEmail(email));
        onNext();
      } else if (statusCode === 400) {
        setCodeError("인증 번호를 입력해주세요.");
      } else if (statusCode === 401) {
        setCodeError("인증 번호가 틀렸습니다.");
      }
    } catch (error) {
      console.error(error);
      setCodeError("예기치 못한 오류가 발생했습니다. 다시 시도해주세요");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, field: "email" | "authCode") => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (field === "email") {
        handleSendEmail();
      } else if (field === "authCode") {
        handleVerifyCode();
      }
    }
  }

  return (
    <FormContainer>
      {/* 이메일 입력 */}
      <TextFieldContainer>
        <StyledTextField
          label="이메일"
          variant="filled"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailBlur}
          error={!!emailError}
          onKeyDown={(e) => handleKeyDown(e, "email")}
        />
        <IconButton onClick={() => setEmail("")}>
          <HighlightOffOutlinedIcon />
        </IconButton>
      </TextFieldContainer>
      {isSending ? (
        <StatusContainer>
          <StatusText>발송 중...</StatusText>
        </StatusContainer>
      ) : isEmailSent ? (
        <StatusContainer>
          <StatusText>발송 완료</StatusText>
          <MailButton onClick={() => window.open("https://mail.sch.ac.kr", "_blank")}>
            메일함 이동하기
          </MailButton>
        </StatusContainer>
      ) : (
        emailError && <ErrorText>{emailError}</ErrorText>
      )}

      {/* 인증번호 입력 */}
      {isEmailSent && (
        <AnimatedContainer>
          <TextFieldContainer>
            <StyledTextField
              label="인증번호"
              variant="filled"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "authCode")}
            />
            <IconButton onClick={() => setAuthCode("")}>
              <HighlightOffOutlinedIcon />
            </IconButton>
          </TextFieldContainer>
          {codeError && <ErrorText>{codeError}</ErrorText>}
        </AnimatedContainer>
      )}

      {/* 버튼 그룹 */}
      <ButtonContainer isEmailSent={isEmailSent}>
        <StyledButton onClick={handleSendEmail}>이메일 발송</StyledButton>
        <StyledButton onClick={handleVerifyCode} disabled={!isEmailSent}>
          인증하기
        </StyledButton>
      </ButtonContainer>
    </FormContainer>
  );
};

export default SignUpEmailForm;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: height 0.3 ease;
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

const ButtonContainer = styled.div<{ isEmailSent: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 80%;
  gap: 10px;
  animation: fadeInSlide 0.5s forwards;
`;

const StyledButton = styled(Button)`
  && {
    border-radius: 20px;
    background: #d9e9f9;
    color: black;
    width: 48%;
  }
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 350px; /* 텍스트와 버튼의 너비를 맞춤 */
  heigth: 30px;
  margin-top: -10px;

`;

const MailButton = styled.button`
  background: #2575fc;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #1a5cb7;
  }
`;

const StatusText = styled.div`
  color: #888;
  font-size: 0.75rem;
  text-align: left;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.75rem;
  text-align: left;
  margin-top: -10px; /* 필드와의 간격 조정 */
  margin-bottom: 10px; /* 아래 콘텐츠와의 간격 조정 */
  width: 350px; /* 필드와 동일한 너비로 확장 */
`;

const AnimatedContainer = styled.div`
  opacity: 0;
  transform: translateY(-20px);
  animation: fadeInSlide 0.3s forwards;
  display: flex;
  flex-direction: column;
  align-items: center;

  @keyframes fadeInSlide {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;