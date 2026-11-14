import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the site under /<repo>/; dev and preview use it too.
  base: "/react-i18n-gettext/",
  // The package comes from file:.., which has its own react in node_modules:
  // two Reacts break hooks, so force one copy.
  resolve: { dedupe: ["react", "react-dom"] },
});
