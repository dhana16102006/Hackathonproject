import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "favicon.ico"],
      manifest: {
        name: "Tactyl",
        short_name: "Buddy",
        description: "Daily habit & streak tracker",
        theme_color: "#ffe1c7",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
              icons: [
        {
          src: "/animal.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],

      },
    }),
  ],
});
