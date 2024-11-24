import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5001", // Replace with your server's API endpoint
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
