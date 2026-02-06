
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Tactyl",
        
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff"
      }
    })
  ]
});
