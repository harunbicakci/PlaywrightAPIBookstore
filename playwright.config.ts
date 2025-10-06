// import { defineConfig } from '@playwright/test';
//
// export default defineConfig({
//   testDir: './tests',          // folder for your test files
//   timeout: 30 * 1000,          // each test max 30s
//   retries: 0,                  // no retries for simplicity
//   reporter: 'list',            // nice console output
//   use: {
//     baseURL: 'https://jsonplaceholder.typicode.com', // default base API URL
//     extraHTTPHeaders: {
//       'Content-Type': 'application/json',
//     },
//   },
// });

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