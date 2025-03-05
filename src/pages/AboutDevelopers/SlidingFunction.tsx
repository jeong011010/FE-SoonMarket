import React, { useState } from "react";
import styled from "styled-components";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AboutClub from "./components/AboutClub";
import AboutDevelopers from "./components/AboutDevelopers";

const SlideFunction: React.FC = () => {
    const [activeButton, setActiveButton] = useState<string>("clubInfo"); // 기본값을 동아리 소개로 설정
    const [slideIndex, setSlideIndex] = useState<number>(0); // 슬라이드 인덱스

    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName); 
        setSlideIndex(buttonName === "clubInfo" ? 0 : 1);
    };

    return (
        <GroupWrapper>
            <StyledButtonGroup variant="contained" aria-label="Basic button group">
                <StyledButton
                    onClick={() => handleButtonClick("clubInfo")}
                    style={{
                        backgroundColor: activeButton === "clubInfo" ? "#92A5FA" : "#D3D3D3",
                        color: "white",
                    }}
                >
                    동아리 소개
                </StyledButton>
                <StyledButton
                    onClick={() => handleButtonClick("devTeam")}
                    style={{
                        backgroundColor: activeButton === "devTeam" ? "#92A5FA" : "#D3D3D3",
                        color: "white",
                    }}
                >
                    개발진
                </StyledButton>
            </StyledButtonGroup>

            <SlidingContainer value={slideIndex}>
                <SlidingPanel isActive={slideIndex === 0}>
                    <AboutClub />
                </SlidingPanel>
                <SlidingPanel isActive={slideIndex === 1}>
                    <AboutDevelopers />
                </SlidingPanel>
            </SlidingContainer>
        </GroupWrapper>
    );
};

// Styled
const StyledButtonGroup = styled(ButtonGroup)`
    display: flex;
    justify-content: flex-start; /* 버튼 그룹을 왼쪽 정렬 */
    margin-top: 0px;
    margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
    font-family: 'SUIT', sans-serif; 
    text-align: left;
`;

const SlidingContainer = styled.div<{ value: number }>`
    display: flex;
    width: 200%; /* 두 개의 패널을 수용할 수 있도록 설정 */
    transform: translateX(${(props) => props.value * -50}%); /* 슬라이드 효과 */
    transition: transform 0.5s ease-in-out; /* 부드러운 전환 효과 */
    overflow: hidden; /* 부모 컨테이너에서 스크롤 방지 */
`;

const SlidingPanel = styled.div<{ isActive: boolean }>`
    width: 50%; /* 각 패널의 너비 */
    flex-shrink: 0; /* 크기 고정 */
    padding: 16px; /* 내부 여백 */
    box-sizing: border-box; /* 패딩 포함 크기 계산 */
    opacity: ${({ isActive }) => (isActive ? 1 : 0)};
    visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')}; /* 활성화된 패널만 표시 */
    transition: opacity 0.5s ease-in-out; /* 부드러운 전환 효과 */
`;

const GroupWrapper = styled.div`
    margin-left: 20px;
`;

export default SlideFunction;
