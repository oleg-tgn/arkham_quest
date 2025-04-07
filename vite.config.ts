import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 👇 это ключевая строка
    rollupOptions: {
      // отключение использования native binary
      external: ['@rollup/rollup-linux-x64-gnu']
    }
  }
});
