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

export enum MessageType {
  ENTER = "ENTER",
  TALK = "TALK",
}

// 채팅 메시지 타입
export interface ChatMessage {
  type: MessageType;
  roomId: string;
  senderId: number;
  message: string;
  nickname: string;
  fileUrl: string;
}