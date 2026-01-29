/**
 * BasePage - Base class for all page objects
 * Provides common functionality for navigation, waiting, and element interactions
 */
class BasePage {
    constructor(page) {
        this.page = page;
    }

    /**
     * Navigate to a specific URL
     * @param {string} url - The URL to navigate to
     */
    async navigate(url) {
        await this.page.goto(url);
    }

    /**
     * Get the current page title
     * @returns {Promise<string>} The page title
     */
    async getTitle() {
        return await this.page.title();
    }

    /**
     * Get the current URL
     * @returns {Promise<string>} The current URL
     */
    async getCurrentUrl() {
        return this.page.url();
    }

    /**
     * Wait for an element to be visible
     * Uses Playwright's auto-waiting - no hard waits
     * @param {string} selector - The element selector
     */
    async waitForElement(selector) {
        await this.page.waitForSelector(selector, { state: 'visible' });
    }

    /**
     * Check if an element is visible
     * @param {string} selector - The element selector
     * @returns {Promise<boolean>} True if visible, false otherwise
     */
    async isElementVisible(selector) {
        try {
            return await this.page.locator(selector).isVisible();
        } catch (error) {
            return false;
        }
    }

    /**
     * Get text content of an element
     * @param {string} selector - The element selector
     * @returns {Promise<string>} The text content
     */
    async getElementText(selector) {
        return await this.page.locator(selector).textContent();
    }

    /**
     * Take a screenshot
     * @param {string} name - Screenshot filename
     */
    async takeScreenshot(name) {
        await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
    }
}

module.exports = BasePage;
