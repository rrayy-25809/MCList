import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');

    console.log('ENV is loaded:', env);

    return {
      plugins: [react()],
      server: {
        port: 5173,
        proxy: {
          // /api/** 요청을 백엔드로 프록시
          '/api': {
            target: env.MAIN_API_URL,
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace('/api', ""),
          },
        },
      },
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
