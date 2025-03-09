import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import SelectedGroup from "../../../assets/SelectedGroup.png";
import UnselectedGroup from "../../../assets/UnselectedGroup.png";

const AboutDevelopers: React.FC = () => {
    const [selectedDeveloper, setSelectedDeveloper] = useState<number | null>(null);

    const developers = [
        { name: "신유승", description: <>🙂 안녕하세요! <br />프론트엔드 개발자 신유승입니다! <br />아무쪼록 저희 서비스 잘 활용해주세요!</>, github: "https://github.com/SinYusi" },
        { name: "김정훈", description: <>개발과 창작에 열정이 넘치는 <br />풀스택 개발자 김정훈입니다</>, github: "https://github.com/jeong011010" },
        { name: "이준서", description: <>개발자 꿈나무입니다🌱</>, github: "https://github.com/Junse0lee" },
        { name: "신동화", description: <>DevOps 와 백엔드 개발을 공부하며<br/> 개발자를 꿈꾸는 신동화 입니다!</>, github: "https://github.com/ghwa112" },
        { name: "김재우", description: <>개발자 희망하는 김재우입니다</>, github: "https://github.com/Po0i037E" },
        { name: "이승호", description: <>카페인을 코드로 바꾸는 능력을 가진 <br/>공대생 이승호입니다.</>, github: "https://github.com/CaffeineLIL" },
    ];

    const toggleDeveloper = (index: number) => {
        if (selectedDeveloper === index) {
            setSelectedDeveloper(null);
        } else {
            setSelectedDeveloper(index);
        }
    };

    return (
        <Container>
            <Title>개발자 목록</Title>
            <DeveloperList>
                {developers.map((developer, index) => (
                    <DeveloperItem 
                        key={index} 
                        onClick={() => toggleDeveloper(index)} 
                        isSelected={selectedDeveloper === index}
                        style={{ 
                            backgroundImage: `url(${selectedDeveloper === index ? SelectedGroup : UnselectedGroup})`, 
                            backgroundSize: '104% 120%', // 버튼 크기에 맞게 이미지 크기 조정
                            backgroundPosition: 'center', // 중앙 정렬
                            backgroundRepeat: 'no-repeat' // 반복 방지
                        }} 
                    >
                        <NameText>{developer.name}</NameText> {/* 이름 텍스트 추가 */}
                    </DeveloperItem>
                ))}
            </DeveloperList>
            {selectedDeveloper !== null && (
                <Details>
                    <Description>{developers[selectedDeveloper].description}</Description>
                    <GithubLink href={developers[selectedDeveloper].github} target="_blank">
                        GitHub 링크
                    </GithubLink>
                </Details>
            )}
        </Container>
    );
};

// 슬라이드 인 애니메이션 정의
const slideIn = keyframes`
    from {
        transform: translateY(20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

// Styled components
const Container = styled.div`
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    position: relative; /* 상대 위치 설정 */
`;

const Title = styled.h2`
    color: white;
    margin: 0;
    padding: 20px 0;
`;

const DeveloperList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    margin: 0px;
`;

const DeveloperItem = styled.div<{ isSelected: boolean }>`
    background-color: ${({ isSelected }) => (isSelected ? '#FFCC00' : 'lightgray')};
    margin: 19px 0;
    padding: 10px; // 상하 패딩
    border-radius: 5px;
    width: 80%; // 버튼 너비
    cursor: pointer;
    text-align: center;
    transition: background-color 0.1s, transform 0.2s; // transform 추가

    &:hover {
        background-color: ${({ isSelected }) => (isSelected ? '#FFCC00' : 'rgba(200, 200, 200, 0.8)')};
    }

    &:active {
        transform: scale(0.95); // 클릭 시 약간 줄어드는 효과
    }
`;

const NameText = styled.span`
    position: relative; /* 이름 텍스트를 중앙에 위치시키기 위해 상대 위치 설정 */
    color: black; /* 텍스트 색상 설정 */
    font-weight: bold; /* 텍스트 굵기 설정 */
`;

const Details = styled.div`
    position: fixed; /* 고정 위치 설정 */
    bottom: 56px; /* 화면 하단에서 56px 위에 위치 */
    background-color: white;
    padding: 15px;
    border-radius: 5px;
    width: 80%;
    max-height: 200px; /* 최대 높이 설정 (필요에 따라 조정 가능) */
    overflow: hidden; /* 내용이 초과할 경우 숨김 */
    text-align: center; /* 가운데 정렬 */
    animation: ${slideIn} 0.3s forwards;
`;

const Description = styled.p`
    margin: 0;
    font-size: 1rem;
`;

const GithubLink = styled.a`
    display: inline-block;
    margin-top: 5px; /* 간격을 줄임 */
    color: rgb(97, 142, 219);
    text-decoration: none;
    font-weight: bold;

    &:hover {
        text-decoration: underline;
    }
`;

export default AboutDevelopers;
