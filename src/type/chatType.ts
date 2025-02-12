export interface ChatList {
  roomId : string;
  postImageUrl : string;
  latestMessageTime : string;
  latestMessage : string;
  opponentNickName : string;
  myNickName : string;
  myId : number;
}

export interface Chat {
  roomId: string; // 채팅방 ID
  authorId: number; // 작성자 ID
  buyerId: number; // 구매자 ID
  postId: number; // 연결된 게시물 ID
}

// 채팅 메시지 타입
export interface ChatMessage {
  messageId: number; // 메시지 고유 ID
  roomId: string; // 채팅방 ID
  senderId: number; // 메시지 보낸 사람 ID
  content: string; // 메시지 내용
  sendAt: string; // 전송 시간
}