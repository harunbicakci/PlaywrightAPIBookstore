import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // folder where your test files are
  timeout: 60 * 1000, // 60s per test
  retries: 1, // retry once if a test fails
  use: {
    baseURL: 'https://practicesoftwaretesting.com',
    headless: true, // set false if you want to watch the browser
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // Run tests in parallel on 3 browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  reporter: [
    ['list'], // console
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
});