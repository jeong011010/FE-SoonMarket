importScripts(
  "https://www.gstatic.com/firebasejs/9.7.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.7.0/firebase-messaging-compat.js"
);

// Firebase 초기화
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA1cuWopde2J6TVht35GKjvEfHiBhqRu3s",
    authDomain: "soonmarket-57ca3.firebaseapp.com",
    projectId: "soonmarket-57ca3",
    storageBucket: "soonmarket-57ca3.firebasestorage.app",
    messagingSenderId: "656483162611",
    appId: "1:656483162611:web:07c8794b39d1a9eced9a86",
    measurementId: "G-KJQGV2ML7P"
});

// Firebase Messaging 인스턴스 생성
const messaging = firebase.messaging();

// 백그라운드 메시지 처리
messaging.onBackgroundMessage(function (payload) {
  const notification = payload.notification;

  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    notification
  );

  const notificationTitle = notification.title;
  const notificationOptions = {
    body: notification.body,
    icon: "/firebase-logo.png", // 루트 경로 기준으로 접근
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
