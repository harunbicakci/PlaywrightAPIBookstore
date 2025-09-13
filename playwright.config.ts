import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 30000, // 30 seconds per test
  expect: {
    timeout: 20000, // 20 seconds for assertions
  },
  testDir: './tests',
  fullyParallel: true, // Enable parallel execution
  workers: 1, // Single worker is sufficient for API tests
  reporter: 'html', // Keep HTML report for visibility
  use: {
    // Remove baseURL since it's API-specific and not shared
    // Remove screenshot and trace as they’re UI-focused
  },
});














//////////////////////////////////////////////////////////////////////////////////////////

// import { defineConfig, devices } from '@playwright/test';

// export default defineConfig({
//   timeout: 30000, // 30 seconds per test
//   expect: {
//     timeout: 20000, // 20 seconds for assertions
//   },
//   testDir: './tests',
//   fullyParallel: true, // Enable parallel execution
//   workers: 3, // One per browser (Chromium, Firefox, WebKit)
//   reporter: 'html', // Generate HTML report
//   use: {
//     baseURL: 'https://demoqa.com', // Base URL for DemoQA
//     trace: 'on-first-retry', // Capture traces on failure
//     actionTimeout: 20000, // 20 seconds for actions
//     screenshot: 'only-on-failure', // Capture screenshots on failure
//   },
//   projects: [
//     {
//       name: 'chromium',
//       use: { ...devices['Desktop Chrome'] },
//     },
//     {
//       name: 'firefox',
//       use: { ...devices['Desktop Firefox'] },
//     },
//     {
//       name: 'webkit',
//       use: { ...devices['Desktop Safari'] },
//     },
//   ],
// });