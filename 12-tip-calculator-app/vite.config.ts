import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  base: '/frontend-mentor-challenges/12-tip-calculator-app/',
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});
