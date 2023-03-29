const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
	testDir: './tests',
	timeout: 30 * 1000,
	expect: { timeout: 15 * 1000 },
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'allure-playwright',
	use: {
		baseURL: 'https://telnyx.com',
		headless: true,
		screenshot: "only-on-failure",
	},
	projects: [
		{
            name: 'chromium',
			use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } },
		},
		{
            name: 'firefox',
			use: { ...devices['Desktop Firefox'], viewport: { width: 1920, height: 1080 } }
		},
		{
		  name: 'Microsoft Edge',
		  use: { ...devices['Desktop Edge'], viewport: { width: 1920, height: 1080 } },
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'], viewport: { width: 1920, height: 1080 } },
		},
	],
})