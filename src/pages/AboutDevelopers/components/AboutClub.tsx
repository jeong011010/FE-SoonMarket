import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ComingSoonImage from "../../../assets/COMING_SOON.jpg"; // 이미지 경로를 임포트

const AboutClub: React.FC = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    };

    useEffect(() => {
        window.addEventListener("scroll", updateScroll);
        return () => {
            window.removeEventListener("scroll", updateScroll);
        };
    }, []);

    return (
        <GroupWrapper>
            <Contents scrollPosition={scrollPosition}>
                <Image src={ComingSoonImage} alt="COMING SOON" />
                <Title>COMING - SOON</Title>
                <div>
                    안녕하세요. 교내 IT 서비스 개발 동아리 Coming Soon 입니다. 
                    저희 팀은 2023년 2월 '순천향대 맛집 알리미'라는 웹 서비스로 시작하여, 교내 공지사항, 강의실 찾기, 동아리 모아보기, 셔틀버스 정보 확인 등
                    학교 생활에 필요한 다양한 정보를 제공하는 순천향대학교 종합 정보 제공 플랫폼 SOON+를 개발/ 운영 중입니다
                </div>
                <div>
                    신학기를 맞아 SOON+의 서비스 기능을 더욱 확장하고, 안정적으로 운영해나가기 위해 신규 개발팀을 모집하고자 합니다. 
                </div>
                <div>
                    모집 인원: 00명
                    Coming Soon은 Core/Newbie 두 파트로 운영할 예정입니다. 
                    자세한 사항은 아래 링크에서 확인해주시기 바랍니다.
                </div>
                
            </Contents>
        </GroupWrapper>
    );
};

// Styled
const GroupWrapper = styled.div`
    display: flex;
    flex-direction: column; /* 세로 방향 정렬 */
    align-items: center; /* 중앙 정렬 */
    min-height: 100vh; /* 최소 높이 설정 */
    overflow: hidden; /* 자식 요소가 넘치는 부분 숨기기 */
`;

const Contents = styled.div<{ scrollPosition: number }>`
    display: flex;
    flex-direction: column; /* 세로 방향으로 정렬 */
    align-items: center; /* 중앙 정렬 */
    overflow-y: auto; /* 세로 스크롤 가능 */
    max-height: 47vh; /* 최대 높이를 화면 높이에서 50px 줄임 (하단 바 고려) */
    width: 100%; /* 너비를 100%로 설정 */
    padding-bottom: 10px; /* 하단 바와의 간격을 위해 여백 추가 */
`;


const Image = styled.img`
    margin: 0px;
    max-width: 100%; /* 이미지 최대 너비를 100%로 설정 */
    height: auto; /* 비율에 맞게 높이 자동 조정 */
`;

const Title = styled.div`
    margin-top: 20px; /* 이미지와 텍스트 사이의 여백 */
    font-size: 20px; /* 글자 크기 설정 */
    text-align: center; /* 텍스트 중앙 정렬 */
`;

export default AboutClub;
