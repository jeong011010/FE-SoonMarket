import { onMessage } from "firebase/messaging";
import { useEffect, useState } from "react";
import { messaging } from "../../firebaseConfig";

interface Notification {
  id: string;
  message: string;
}

const useNotificationListener = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("📩 Foreground message received:", payload);

      // 새로운 알림을 리스트에 추가
      setNotifications((prev) => [
        ...prev,
        { id: payload.messageId || new Date().toISOString(), message: payload.notification?.body || "새 알림" }
      ]);
    });

    return () => unsubscribe();
  }, []);

  return { notifications, setNotifications };
};

export default useNotificationListener;