const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
	testDir: './test/tests',
	timeout: 60 * 1000,
	expect: {
		timeout: 15000
	},
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'allure-playwright',
	use: {
		baseURL: 'https://telnyx.com/',
		viewport: { width: 1920, height: 1080 },
		headless: true,
		screenshot: "only-on-failure",
	},
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
    /* Test against mobile viewports. */
		// {
      	// 	name: 'Mobile Chrome',
      	// 	use: { ...devices['Pixel 5'] },
    	// },
    	// {
      	// 	name: 'Mobile Safari',
      	// 	use: { ...devices['iPhone 12'] },
    	// },
    /* Test against branded browsers. */
    	// {
      	// 	name: 'Microsoft Edge',
      	// 	use: { channel: 'msedge' },
    	// },
    	// {
      	// 	name: 'Google Chrome',
      	// 	use: { channel: 'chrome' },
    	// },
	],
});