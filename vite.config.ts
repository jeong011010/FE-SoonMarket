import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'generate-firebase-env',
      buildEnd() {
        const firebaseEnv = `
          self.FIREBASE_CONFIG = {
            apiKey: "${process.env.VITE_FIREBASE_API_KEY}",
            authDomain: "${process.env.VITE_FIREBASE_AUTH_DOMAIN}",
            projectId: "${process.env.VITE_FIREBASE_PROJECT_ID}",
            storageBucket: "${process.env.VITE_FIREBASE_STORAGE_BUCKET}",
            messagingSenderId: "${process.env.VITE_FIREBASE_MESSAGING_SENDER_ID}",
            appId: "${process.env.VITE_FIREBASE_APP_ID}"
          };
        `;
        fs.writeFileSync('public/firebase-env.js', firebaseEnv);
      }
    }
  ],
  base: "/",
  define: {
    global: "globalThis",
  },
})