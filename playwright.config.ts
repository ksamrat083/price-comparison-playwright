import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000,
  use: {
    headless: false,
    trace: 'on-first-retry',
  },
  reporter: [['list'], ['html']],
});
 
