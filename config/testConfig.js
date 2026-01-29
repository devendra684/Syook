/**
 * Test Configuration
 * Centralized configuration for test execution
 */
module.exports = {
    // Base URL for the application
    baseURL: 'https://bugbash.syook.com',

    // Timeout configurations (in milliseconds)
    timeouts: {
        default: 30000,
        navigation: 30000,
        action: 10000,
        assertion: 5000,
    },

    // Retry configuration
    retries: {
        testRetries: 0,
        ciRetries: 2,
    },

    // Browser configuration
    browsers: ['chromium', 'firefox', 'webkit'],

    // Screenshot and video settings
    artifacts: {
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
    },

    // Parallel execution
    workers: {
        local: undefined, // Use all available cores
        ci: 1,
    },
};
