import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30000, // 30 seconds per test
  expect: {
    timeout: 10000, // 10 seconds for assertions
  },
  testDir: './tests',
  fullyParallel: true, // Enable parallel execution
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0, // 1 retry for local runs
  workers: 3, // 3 workers for parallel execution, MS Edge is Chromium based
  reporter: [['html', { noSnippets: false}]], // HTML report for results
  use: {
    baseURL: 'https://demoqa.com', // Base URL for DemoQA
    trace: 'on-first-retry',
    actionTimeout: 10000, // 10 seconds for actions
    screenshot: 'only-on-failure', // Screenshot on failure
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'msedge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});