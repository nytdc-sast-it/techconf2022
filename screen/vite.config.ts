import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  mode: "development",
  server: {
    open: true,
    fs: {
      strict: true,
    },
    proxy: {
      "/api": {
        target: "https://techconf.sastit.com/api/",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ""),
      },
    },
  },
});
