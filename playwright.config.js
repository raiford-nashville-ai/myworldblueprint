import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: true,
  workers: 2,
  timeout: 60000,
  expect: { timeout: 10000 },
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:1412",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    // Fix LCD subpixel rasterization across inline-reference and external-asset pages.
    // Both pages use the same browser settings; no screenshot masks or diff tolerance.
    { name: "chromium", use: { browserName: "chromium", launchOptions: { args: ["--disable-lcd-text"] } } },
    { name: "firefox", use: { browserName: "firefox" } },
  ],
  webServer: {
    command: "node tests/serve-production.mjs",
    url: "http://127.0.0.1:1412",
    reuseExistingServer: false,
    timeout: 60000,
  },
});
