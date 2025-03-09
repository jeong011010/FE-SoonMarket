import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// 🔹 Firebase 환경 변수 설정
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// 🔹 **FCM 토큰 요청 함수**
export const getFCMToken = async (): Promise<string | null> => {
	try {
		const token = await getToken(messaging, {
			vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
		});
		return token;
	} catch (error) {
		console.error("FCM 토큰 가져오기 실패:", error);
		return null;
	}
};

onMessage(messaging, (payload) => {
	if (payload.notification) alert(`알림: ${payload.notification.title}`);
});
