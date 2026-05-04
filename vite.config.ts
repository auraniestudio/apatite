import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const ENQUIRY_API_TARGET =
  "https://5350sqjspa.execute-api.ap-southeast-2.amazonaws.com";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Same-origin in dev → avoids browser CORS to API Gateway
      "/api/enquiries": {
        target: ENQUIRY_API_TARGET,
        changeOrigin: true,
        secure: true,
        rewrite: () => "/prod/enquiries",
      },
    },
  },
});
