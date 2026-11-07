import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  build: { sourcemap: false },
  // The 3D scenes are lazy-loaded, so Vite would otherwise discover these
  // packages late and re-bundle them mid-session against a second copy of React.
  resolve: { dedupe: ["react", "react-dom"] },
  optimizeDeps: {
    include: ["three", "@react-three/fiber", "@react-three/drei"],
  },
});
