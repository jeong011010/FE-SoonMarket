import React from "react";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const ServerInfo: React.FC = () => {
    const navigate = useNavigate();

    const versions = [
        {
            number: "1.0",
            date: "2025-03-07",
            changes: [],
        },
        // 추가 버전 정보를 여기에 넣어주세요.
    ];

    return (
        <Container>
            <Header>
                <BackButton>
                    <IconButton onClick={() => navigate("/mypage")}>
                        <ArrowBackIcon />
                    </IconButton>
                </BackButton>
                <Title>Soon-Market</Title>
            </Header>
            <VersionContainer>
                <VersionTitle>버전 정보</VersionTitle>
                {versions.map((version) => (
                    <VersionInfo key={version.number}>
                        <VersionItem>
                            <VersionNumber>{`버전 ${version.number}`}</VersionNumber>
                            <ReleaseDate>{`날짜: ${version.date}`}</ReleaseDate>
                            <ChangeLog>
                                {version.changes.map((change, index) => (
                                    <ChangeItem key={index}>- {change}</ChangeItem>
                                ))}
                            </ChangeLog>
                        </VersionItem>
                    </VersionInfo>
                ))}
            </VersionContainer>
        </Container>
    );
};

// styled-components 정의
const Container = styled.div`
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-bottom: 0px;
`;

const BackButton = styled.div`
    position: fixed; /* 위치를 고정으로 변경 */
    left: 16px;
    top: 16px;
`;

const Title = styled.h1`
    margin-top: 40px;
    margin-bottom: 20px;
    font-family: 'SUIT', sans-serif;
    font-size: 37px;
`;

const VersionContainer = styled.div`
    margin-top: 20px;
`;

const VersionTitle = styled.h2`
    font-size: 24px;
    color: #333;
`;

const VersionInfo = styled.div`
    margin-top: 20px;
`;

const VersionItem = styled.div`
    margin-bottom: 15px;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
`;

const VersionNumber = styled.h2`
    font-size: 20px;
    color: #007bff;
`;

const ReleaseDate = styled.p`
    font-size: 14px;
    color: #666;
`;

const ChangeLog = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const ChangeItem = styled.li`
    margin: 5px 0;
`;

export default ServerInfo;
