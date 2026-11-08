import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

// Mirror Vercel locally: unknown page URLs get 404.html instead of the
// single-page fallback, so the 404 page can be checked with `npm run dev`.
const notFoundInDev = {
  name: "not-found-in-dev",
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      const path = (req.url || "/").split("?")[0];
      const isPage = (req.headers.accept || "").includes("text/html");
      const known = path === "/" || path === "/index.html" || path === "/404.html";
      const isFile = existsSync(root + "public" + path) || existsSync(root + path.slice(1));
      if (isPage && !known && !isFile && !path.startsWith("/@")) req.url = "/404.html";
      next();
    });
  },
};

export default defineConfig({
  plugins: [react(), notFoundInDev],
  server: { port: 5173 },
  build: {
    sourcemap: false,
    // Two pages: the site, and 404.html, which Vercel serves (with a real 404
    // status) for any URL that doesn't exist.
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        notFound: fileURLToPath(new URL("./404.html", import.meta.url)),
      },
    },
  },
  // The 3D scenes are lazy-loaded, so Vite would otherwise discover these
  // packages late and re-bundle them mid-session against a second copy of React.
  resolve: { dedupe: ["react", "react-dom"] },
  optimizeDeps: {
    include: ["three", "@react-three/fiber"],
  },
});
