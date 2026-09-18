import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.E2E_BASE_URL;

if (!baseURL) {
  throw new Error(
    'E2E_BASE_URL is not set. The end-to-end suite runs against a deployed environment, so there is no default to fall back to.',
  );
}

export default defineConfig({
  testDir: 'tests/e2e',
  testMatch: '**/*.e2e-spec.ts',
  // A deployed environment is shared, so a failure is worth one retry
  // before it is called a failure - but only in CI, where flakes cost a
  // promotion rather than a rerun.
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    extraHTTPHeaders: {
      ...(process.env.VERCEL_PROTECTION_BYPASS
        ? { 'x-vercel-protection-bypass': process.env.VERCEL_PROTECTION_BYPASS }
        : {}),
    },
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
