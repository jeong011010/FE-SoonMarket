import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { ChatMessage } from "../../type/chatType";

const SERVER_URL = `${import.meta.env.VITE_API_URL_ORIGIN}/ws-stomp`; // 백엔드 STOMP 엔드포인트

const useChat = (roomId: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const stompClient = useRef<Stomp.Client | null>(null);

  useEffect(() => {
    const socket = new SockJS(SERVER_URL);
    const client = Stomp.over(socket);
    
    client.connect({}, () => {
      console.log("WebSocket 연결됨");

      // 채팅방 구독
      client.subscribe(`/sub/chat/room/${roomId}`, (message) => {
        const receivedMessage: ChatMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
    });

    stompClient.current = client;

    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect(() => {
          console.log("WebSocket 연결 종료됨");
        });
      }
    };
  }, [roomId]);

  const sendMessage = (msg: ChatMessage) => {
    console.log(msg);
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.send(
        "/pub/chat/message",
        {},
        JSON.stringify(msg)
      );
    }
  };

  return { messages, sendMessage };
};

export default useChat;