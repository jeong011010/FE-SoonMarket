import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { ChatMessage } from "../../type/chatType";

const SERVER_URL = `${import.meta.env.VITE_API_URL_ORIGIN}/ws-stomp`;

const useChat = (roomId: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const stompClient = useRef<Stomp.Client | null>(null);
  const isConnected = useRef(false); // 연결 상태 추적

  useEffect(() => {
    const socket = new SockJS(SERVER_URL);
    const client = Stomp.over(socket);

    client.connect(
      {},
      () => {
        console.log("WebSocket 연결됨");
        stompClient.current = client;
        isConnected.current = true; // 연결 완료 플래그

        // 채팅방 구독
        client.subscribe(`/sub/chat/room/${roomId}`, (message) => {
          const receivedMessage: ChatMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
      },
      (error) => {
        console.error("WebSocket 연결 실패:", error);
        isConnected.current = false;
      }
    );

    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect(() => {
          console.log("WebSocket 연결 종료됨");
          stompClient.current = null;
          isConnected.current = false;
        });
      }
    };
  }, [roomId]);

  const sendMessage = (msg: ChatMessage) => {
    if (stompClient.current && isConnected.current) {
      stompClient.current.send(
        "/pub/chat/message",
        {},
        JSON.stringify(msg)
      );
    } else {
      console.warn("WebSocket이 아직 연결되지 않음.");
    }
  };

  return { messages, sendMessage };
};

export default useChat;