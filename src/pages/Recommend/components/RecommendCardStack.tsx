import React, { useEffect, useRef, useState } from "react";
import TinderCard from "react-tinder-card";
import styled from "styled-components";
import useGetRecommendPost from "../../../api/Post/useGetRecommendPost";
import useLikePost from "../../../api/Post/useLikePost";
import { Post } from "../../../type/postType";
import RecommendCard from "./RecommendCard";

interface TinderCardAPI {
  swipe: (direction: "left" | "right") => Promise<void>;
  restoreCard: () => Promise<void>;
}

const RecommendCardStack: React.FC = () => {
  const likePost = useLikePost();
  const { recommendPosts, getRecommendPosts } = useGetRecommendPost();
  const [currentCards, setCurrentCards] = useState<Post[]>([]);

  const tinderCardRefs = useRef<(React.RefObject<TinderCardAPI>)[]>([]);

  // 초기 데이터 로드
  useEffect(() => {
    getRecommendPosts();
  }, []);

  useEffect(() => {
    if (currentCards.length <= 2) {
      console.log("🟡 카드가 2개 이하로 남음. 새로운 추천 게시물 요청.");
      getRecommendPosts();
    }
  }, [currentCards.length]); // `currentCards.length`가 변할 때만 실행

  // 새로운 추천 게시물을 불러왔을 때 처리
  useEffect(() => {

    if (recommendPosts.length === 0) {
      return; // 📌 카드가 없으면 업데이트하지 않음
    }

    const uniqueCards = recommendPosts.filter(
      (newCard) => !currentCards.some((card) => card.postId === newCard.postId)
    );

    if (uniqueCards.length === 0) {
      return; // 📌 새로운 카드가 없으면 업데이트하지 않음
    }

    setCurrentCards((prevCards) => [...prevCards, ...uniqueCards]);
    tinderCardRefs.current = [
      ...tinderCardRefs.current,
      ...uniqueCards.map(() => React.createRef<TinderCardAPI>()),
    ];
  }, [recommendPosts]);

  const handleSwipe = (direction: string, cardIndex: number) => {
    const card = currentCards[cardIndex];
    if (direction === "right") {
      likePost(card.postId.toString()); // 카드 오른쪽 스와이프 시 호출
    }
  };

  const handleCardLeftScreen = (cardId: string) => {
    setCurrentCards((prevCards) => {
      const updatedCards = prevCards.filter((card) => card.postId.toString() !== cardId);
  
      if (updatedCards.length === 0) {
        getRecommendPosts(); // 새 추천 목록 요청
      }
  
  
      return updatedCards;
    });
  };

  const isTopCard = (index: number) => index === currentCards.length - 1;

  const triggerSwipe = async (direction: "left" | "right", index: number) => {
    const cardRef = tinderCardRefs.current[index];
    console.log(tinderCardRefs);
    if (cardRef && cardRef.current) {
      await cardRef.current.swipe(direction); // TinderCard의 swipe 메서드 호출
    } else {
      console.warn("Card ref is null or not connected.");
    }
  };

  return (
    <CardStack>
      <NoRecommendCard>추천해 드릴 게시글이 없어요.</NoRecommendCard>
      {
        currentCards.map((card, index) => (
          <div
            key={card.postId}
            onTouchStart={(ev) => ev.stopPropagation()}
            style={{
              pointerEvents: isTopCard(index) ? "auto" : "none",
            }}
          >
            <TinderCard
              ref={tinderCardRefs.current[index]}
              className="swipe"
              preventSwipe={["up", "down"]}
              onSwipe={(dir) => isTopCard(index) && handleSwipe(dir, index)}
              onCardLeftScreen={() =>
                isTopCard(index) && handleCardLeftScreen(card.postId.toString())
              }
            >
              <RecommendCard
                img={card.images[0]?.imageUrl || ""}
                title={card.title}
                price={card.price}
                
                onThumbUp={() => triggerSwipe("right", index)}
                onThumbDown={() => triggerSwipe("left", index)}
              />
            </TinderCard>
          </div>
        ))}
    </CardStack>
  );
};

// Styled Components
const CardStack = styled.div`
  position: relative;
  z-index: 2; /* 카드가 배경 위로 보이도록 설정 */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 70%;
  padding: 20px;
  overflow: hidden;
`;

const NoRecommendCard = styled.div`
  border-radius: 2px;
  width: 260px;
  height: 440px;
  margin: 10px 5px;
  padding: 0px 20px;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
  text-align: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  font-size: 16px;
  z-index: 0; /* 🔹 항상 가장 아래에 위치 */

  @media (max-width: 400px) or (max-height: 850px) {
    padding: 10px;
    width: 200px;
    height: 320px;
    font-size: 12px;
  }
`;



export default RecommendCardStack;