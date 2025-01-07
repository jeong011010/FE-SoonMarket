import React, { useState } from "react";
import styled from "styled-components";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Button, TextField, IconButton } from "@mui/material";
import usePwCode from "../../../api/Auth/usePwCode";
import useSendCode from "../../../api/Auth/useSendCode";
import { useDispatch } from "react-redux";
import { setUserEmail } from "../../../redux/modules/auth";
import useCheckEmail from "../../../api/Auth/useCheckEmail";

interface FindPwEmailFormProps {
  onNext: () => void;
}

const FindPwEmailForm: React.FC<FindPwEmailFormProps> = ({ onNext }) => {
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const sendEmail = usePwCode();
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
      const statusCode = await checkEmail(email); // 이메일 사용 여부 확인
      if (statusCode === 200) {
        // 이메일이 사용 중이 아닌 경우
        setEmailError("사용 중이 아닌 이메일입니다. 인증 이메일을 보낼 수 없습니다.");
        setIsSending(false);
        return;
      }
  
      // 이메일이 사용 중인 경우
      await sendEmail(email);
      setIsEmailSent(true);
    } catch (error) {
      console.error("이메일 전송 중 오류:", error);
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
    }catch (error) {
        console.error("Verification error:", error); // 에러를 로그로 출력
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
      <SubTitle>비밀번호 변경을 위해 이메일을 작성해주세요.</SubTitle>
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
        <StatusText>발송 중...</StatusText>
      ) : isEmailSent ? (
        <StatusText>발송 완료</StatusText>
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

export default FindPwEmailForm;

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

const StatusText = styled.div`
  color: #888;
  font-size: 0.75rem;
  text-align: left;
  margin-top: -10px;
  margin-bottom: 10px;
  width: 350px;
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

const SubTitle = styled.div`
  font-size: 14px; /* 글씨 크기 */
  margin-bottom: 0px; /* 입력 필드와의 간격 */
`;