import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import svgr from 'vite-plugin-svgr'; 


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite(), svgr()],
  server: {
    watch: {
      usePolling: true
    },
    host: true, // Here
    strictPort: true,
    port: 5173
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
