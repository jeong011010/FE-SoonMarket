import React, { useState } from "react";
import styled from "styled-components";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Button, TextField, IconButton, InputAdornment, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SignUpDetailForm: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    alert("회원가입 성공!");
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
          
        />
        <IconButton onClick={() => setNickname("")}>
          <HighlightOffOutlinedIcon />
        </IconButton>
      </TextFieldContainer>

      {/* 비밀번호 입력 */}
      <TextFieldContainer>
        <StyledTextField
          label="비밀번호"
          variant="filled"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          
        />
        <IconButton onClick={() => setPassword("")}>
          <HighlightOffOutlinedIcon />
        </IconButton>
      </TextFieldContainer>

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

      {/* 제출 버튼 */}
      <SubmitButton onClick={handleSubmit}>회원가입 완료</SubmitButton>
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