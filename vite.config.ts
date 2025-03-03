import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  function generateFirebaseEnv() {
    const firebaseEnv = `
      self.FIREBASE_CONFIG = {
        apiKey: "${env.VITE_FIREBASE_API_KEY}",
        authDomain: "${env.VITE_FIREBASE_AUTH_DOMAIN}",
        projectId: "${env.VITE_FIREBASE_PROJECT_ID}",
        storageBucket: "${env.VITE_FIREBASE_STORAGE_BUCKET}",
        messagingSenderId: "${env.VITE_FIREBASE_MESSAGING_SENDER_ID}",
        appId: "${env.VITE_FIREBASE_APP_ID}"
      };
    `;
    fs.writeFileSync(path.resolve('public/firebase-env.js'), firebaseEnv);
  }

  return {
    plugins: [
      react(),
      {
        name: 'generate-firebase-env',
        configureServer() {
          generateFirebaseEnv(); // 개발 서버에서 실행
        },
        buildEnd() {
          generateFirebaseEnv(); // 빌드 시 실행
        }
      }
    ],
    base: "/",
    define: {
      global: "globalThis",
    },
  };
});