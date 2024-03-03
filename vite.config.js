import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
      include: "**/*.svg?react",
      exportAsDefault: true,
      svgoConfig: {
        floatPrecision: 2,
      },
    }),
  ],
});
