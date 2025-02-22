import { initializeApp, getApps } from "firebase/app"; 
import { getMessaging, getToken } from "firebase/messaging";

export const VAPID_PUBLIC_KEY =
  "BMz2va0mWQU0MEs7Fz0PH0ymBtfscPXmN7NxCiy-CyPY48KVPY1VftOGvqvUP4owVa30wFGbQ-FgwRDbcVvcut4";

const initializeFirebase = () => {
  if (getApps().length === 0) {  // Firebase가 초기화되었는지 확인
    initializeApp({
      apiKey: "AIzaSyA1cuWopde2J6TVht35GKjvEfHiBhqRu3s",
      authDomain: "soonmarket-57ca3.firebaseapp.com",
      projectId: "soonmarket-57ca3",
      storageBucket: "soonmarket-57ca3.firebasestorage.app",
      messagingSenderId: "656483162611",
      appId: "1:656483162611:web:07c8794b39d1a9eced9a86",
      measurementId: "G-KJQGV2ML7P"
    });
  }
};

//requestFCMToken 실행 전에 자동으로 Firebase 초기화
export const requestFCMToken = async () => {
  initializeFirebase();

  const messaging = getMessaging();
  try {
    const currentToken = await getToken(messaging, { vapidKey: VAPID_PUBLIC_KEY });
    return currentToken;
  } catch (err) {
    console.error("An error occurred while retrieving token: ", err);
    return null;
  }
};
