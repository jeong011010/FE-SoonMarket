import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const AboutDevelopers: React.FC = () => {
    const [selectedDeveloper, setSelectedDeveloper] = useState<number | null>(null);

    const developers = [
        { name: "신유승", description: "신유승의 한 줄 설명입니다.", github: "https://github.com/user1" },
        { name: "김정훈", description: "김정훈의 한 줄 설명입니다.", github: "https://github.com/user2" },
        { name: "이준서", description: "이준서의 한 줄 설명입니다.", github: "https://github.com/user3" },
        { name: "신동화", description: "신동화의 한 줄 설명입니다.", github: "https://github.com/user4" },
        { name: "김재우", description: "김재우의 한 줄 설명입니다.", github: "https://github.com/user5" },
        { name: "이승호", description: "이승호의 한 줄 설명입니다.", github: "https://github.com/user6" },
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
                    >
                        {developer.name}
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
    padding: 10px;
    border-radius: 5px;
    width: 80%;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.1s;

    &:hover {
        background-color: ${({ isSelected }) => (isSelected ? '#FFCC00' : 'rgba(200, 200, 200, 0.8)')};
    }
`;

const Details = styled.div`
    position: relative; /* 상대 위치 설정 */
    bottom: 6px; /* 화면 바닥에서 67px 위에 위치 */
    background-color: white;
    padding: 15px;
    border-radius: 5px;
    width: 80%;
    text-align: center; /* 가운데 정렬 */
    animation: ${slideIn} 0.3s forwards;
`;

const Description = styled.p`
    margin: 0;
    font-size: 1rem;
`;

const GithubLink = styled.a`
    display: inline-block;
    margin-top: 10px;
    color: rgb(97, 142, 219);
    text-decoration: none;
    font-weight: bold;

    &:hover {
        text-decoration: underline;
    }
`;

export default AboutDevelopers;
