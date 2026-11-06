import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.USABILITY_BASE_URL ?? 'http://localhost:8788';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  reporter: process.env.CI ? 'github' : 'line',
  timeout: 60_000,
  use: { baseURL, ...devices['Desktop Chrome'] },
  webServer: process.env.USABILITY_BASE_URL
    ? undefined
    : {
        command: 'pnpm exec wrangler dev --port 8788 --local',
        url: baseURL,
        reuseExistingServer: !process.env.CI
      }
});
