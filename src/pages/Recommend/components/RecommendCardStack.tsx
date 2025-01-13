import React, { useEffect, useRef, useState } from "react";
import TinderCard from "react-tinder-card";
import styled from "styled-components";
import useGetRecommendPost from "../../../api/Post/useGetRecommendPost";
import useLikePost from "../../../api/Post/useLikePost";
import { Post } from "../../../type/postType";

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
  }, [getRecommendPosts]);

  useEffect(() => {
    // 추천 게시물이 존재할 경우 새 카드 설정
    if (recommendPosts.length > 0 && currentCards.length === 0) {
      const newCards = [...recommendPosts];
      setCurrentCards(newCards);

      // `tinderCardRefs`를 새로 초기화
      tinderCardRefs.current = newCards.map(() => React.createRef());
    } else if (currentCards.length < 2 && recommendPosts.length > 1) {
      const newCards = [...recommendPosts];
      setCurrentCards((prevCards) => [...newCards, ...prevCards]); // 기존 카드 아래에 추가
      tinderCardRefs.current = [
        ...newCards.map(() => React.createRef<TinderCardAPI>()),
        ...tinderCardRefs.current,

      ];
    } 

  }, [recommendPosts, currentCards]);

  const handleSwipe = (direction: string, cardIndex: number) => {
    const card = currentCards[cardIndex];
    console.log(`Swiped ${direction} on card ${cardIndex}, ${card.postId}`);
    if (direction === "right") {
      likePost(card.postId.toString()); // 카드 오른쪽 스와이프 시 호출
    }
  };

  const handleCardLeftScreen = (cardId: string) => {
    setCurrentCards((prevCards) =>
      prevCards.filter((card) => card.postId.toString() !== cardId)
    );
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
      {currentCards.length > 0 ? (
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
        ))
      ) : (
        <NoRecommendCard>
          추천해 드릴 게시글이 없어요.
        </NoRecommendCard>
      )}
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
  height: 470px;
  position: relative;
  display: flex;
  margin: 10px 5px;
  padding: 0px 20px;
  flex-direction: column;
  align-items: center;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
  justify-content: center;
  text-align: center;

  @media (max-width: 390px), (max-height: 850) {
    padding: 10px;
    width: 200px;
    height: 320px;
  }
`;



export default RecommendCardStack;