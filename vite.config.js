import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import next from "vite-plugin-next";

export default defineConfig({
  plugins: [react(), next()],
  server: {
    port: 3000, // Change the port if needed
  },
});
