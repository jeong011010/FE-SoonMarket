import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";

// Firebase 설정
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase 메시징 객체 가져오기
export const messaging = getMessaging(app);

// FCM 토큰 요청 함수
export const requestFCMToken = async () => {
	try {
		// 브라우저에서 알림 권한 요청
		const permission = await Notification.requestPermission();
		if (permission === "granted") {
			const token = await getToken(messaging, {
				vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY, // VAPID 키 추가
			});
			console.log("FCM Token:", token);
			return token;
		} else {
			console.log("알림 권한이 거부됨");
			return null;
		}
	} catch (error) {
		console.error("FCM 토큰 요청 중 오류 발생:", error);
		return null;
	}
};

// 포그라운드에서 메시지 수신 (앱이 실행 중일 때)
onMessage(messaging, (payload) => {
	console.log("포그라운드 메시지 수신:", payload);
	alert(`새로운 알림: ${payload.notification?.title}`);
});