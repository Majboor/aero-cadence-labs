import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Vitest configuration for the FlyAuqab Beta marketing site.
// Component/unit tests run in a jsdom environment with the same "@"
// path alias the app uses so imports resolve identically to production.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    css: true,
    // Playwright specs live under e2e/ and are run by @playwright/test,
    // not Vitest — keep them out of the unit runner.
    exclude: ["e2e/**", "node_modules/**", "dist/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/lib/**", "src/hooks/**", "src/components/**", "src/pages/**"],
    },
  },
});
