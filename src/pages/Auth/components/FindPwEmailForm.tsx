import React, { useState } from "react";
import styled from "styled-components";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Button, TextField, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import usePwCode from "../../../api/Auth/usePwCode";
import useCheckEmail from "../../../api/Auth/useCheckEmail";
import { setUserEmail } from "../../../redux/modules/auth";

const FindPwEmailForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const { sendEmail } = usePwCode();
  const checkEmail = useCheckEmail();
  const dispatch = useDispatch();

  // 이메일 유효성 검사 함수
  const validateEmail = (value: string): boolean =>
    /^[a-zA-Z0-9._%+-]+@sch\.ac\.kr$/.test(value);

  // 이메일 입력 변경 핸들러
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(null);
  };

  // 입력 필드 블러 이벤트 핸들러
  const handleBlur = () => {
    if (!email) {
      setEmailError("이메일을 입력해주세요.");
    } else if (!validateEmail(email)) {
      setEmailError("이메일은 @sch.ac.kr 도메인만 허용됩니다.");
    }
  };

  // 이메일 발송 핸들러
  const handleSendEmail = async () => {
    if (!email) {
      setEmailError("이메일을 입력해주세요.");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("이메일은 @sch.ac.kr 도메인만 허용됩니다.");
      return;
    }
    setIsSending(true);
    try {
      const isEmailUsed = await checkEmail(email);
      if (isEmailUsed === 200) {
        setEmailError(
          "사용 중이지 않은 이메일입니다. 인증 이메일을 보낼 수 없습니다."
        );
        return;
      }
      await sendEmail(email);
      setIsEmailSent(true);
      dispatch(setUserEmail(email));
    } catch (error) {
      console.error("이메일 발송 실패", error);
      setEmailError("이메일 발송에 실패했습니다.");
    } finally {
      setIsSending(false); // 이메일 발송 완료 후 상태 초기화
    }
  };

  return (
    <FormContainer>
      <SubTitle>비밀번호 변경을 위해 이메일을 작성해주세요.</SubTitle>
      <TextFieldContainer>
        <StyledTextField
          label="이메일"
          variant="filled"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleBlur}
          error={!!emailError}
        />
        <IconButton onClick={() => setEmail("")}>
          <HighlightOffOutlinedIcon />
        </IconButton>
      </TextFieldContainer>
      {isSending ? (
        <StatusText>발송 중...</StatusText>
      ) : isEmailSent ? (
        <StatusText>발송 완료</StatusText>
      ) : emailError ? (
        <ErrorText>{emailError}</ErrorText>
      ) : null}
      <ButtonContainer>
        <StyledButton onClick={handleSendEmail} disabled={isSending}>
          이메일 발송
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
`;

const SubTitle = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

const StyledButton = styled(Button)`
  && {
    border-radius: 20px;
    background: #d9e9f9;
    color: black;
    width: 50%;
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
  margin-top: -10px;
  margin-bottom: 10px;
  width: 350px;
`;
