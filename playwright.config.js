const { defineConfig } = require('@playwright/test');

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
			use: {
				channel: 'Desktop Chrome',
			},
		},
		{
			name: 'firefox',
			use: {
				channel: 'Desktop Firefox',
			},
    	},
    	{
      		name: 'webkit',
      		use: {
				channel: 'Desktop Safari',
			},
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