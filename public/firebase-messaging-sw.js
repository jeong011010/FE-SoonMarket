importScripts('/firebase-env.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
});

firebase.initializeApp(self.FIREBASE_CONFIG);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png',
    data: payload.data, // 추가 데이터 포함 가능
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});