import React, { useEffect, useState, useRef } from "react";
import RecommendCard from "./RecommendCard";
import styled from "styled-components";
import useGetRecommendPost from "../../../api/Post/useGetRecommendPost";
import TinderCard from "react-tinder-card";
import useLikePost from "../../../api/Post/useLikePost";

interface TinderCardAPI {
  swipe: (direction: "left" | "right") => Promise<void>;
  restoreCard: () => Promise<void>;
}

type PostImage = {
  imageUrl: string;
  originalName: string;
};


interface RecommendPost {
  postId: number;
  title: string;
  price: number;
  images: PostImage[];
}

const RecommendCardStack: React.FC = () => {
  const likePost = useLikePost();
  const { recommendPosts, getRecommendPosts } = useGetRecommendPost();
  const [currentCards, setCurrentCards] = useState<RecommendPost[]>([]);

  const tinderCardRefs = useRef<(React.RefObject<TinderCardAPI>)[]>([]);

  console.log(currentCards);

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
    }

    // 남은 카드가 1장 이하일 때 새로운 카드를 추가
    if (currentCards.length === 1 && recommendPosts.length > 0) {
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
      {currentCards.map((card, index) => (
        <div
          key={card.postId}
          onTouchStart={(ev) => ev.stopPropagation()}
          style={{
            pointerEvents: isTopCard(index) ? "auto" : "none", // 하위 카드 상호작용 차단
          }}
        >
          <TinderCard
            ref={tinderCardRefs.current[index]} // 각 카드에 올바른 ref 전달
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
              style={{
                position: "absolute",
                left: "50%",
                marginLeft: "-150px",
              }}
              onThumbUp={() => triggerSwipe("right", index)} // Right swipe
              onThumbDown={() => triggerSwipe("left", index)} // Left swipe
            />
          </TinderCard>
        </div>
      ))}
    </CardStack>
  );
};

// Styled Components
const CardStack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 350px;
  height: 70%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  padding: 190px 20px 0px 20px;
`;

export default RecommendCardStack;