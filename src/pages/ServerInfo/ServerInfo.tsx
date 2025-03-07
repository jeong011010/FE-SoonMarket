import React from "react";
import styled from "styled-components";

const ServerInfo: React.FC = () => {
    const versions = [
        {
            number: "1.0",
            date: "2025-03-07",
            changes: [
            ],
        },
        
        // 추가 버전 정보를 여기에 넣어주세요.
    ];

    return (
        <Container>
            <Title>버전 정보</Title>
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
        </Container>
    );
};

// styled-components 정의를 하단으로 옮겼습니다.
const Container = styled.div`
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
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
