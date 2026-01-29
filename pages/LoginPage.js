const BasePage = require('./BasePage');

/**
 * LoginPage - Page Object Model for Login functionality
 * Contains all locators and methods for login page interactions
 */
class LoginPage extends BasePage {
    constructor(page) {
        super(page);

        // Locators for login form elements
        // Using .first() to handle strict mode when multiple elements match
        this.emailInput = page.locator('#email').first();
        this.passwordInput = page.locator('#password').first();
        this.loginButton = page.locator('button[type="submit"]:has-text("Sign In")').first();

        // Error and success message locators
        this.errorMessage = page.locator('.error, .error-message, [class*="error"], [role="alert"], .alert').first();
        this.successMessage = page.locator('.success, .success-message, [class*="success"]').first();

        // Post-login elements
        this.logoutButton = page.locator('button:has-text("Logout")').first();
        this.dashboardElement = page.locator('.product-grid, .dashboard, [class*="dashboard"]').first();
    }

    /**
     * Navigate to login page
     */
    async navigateToLogin() {
        await this.navigate('/');
    }

    /**
     * Perform login with credentials
     * @param {string} email - User email
     * @param {string} password - User password
     */
    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    /**
     * Fill email field only
     * @param {string} email - User email
     */
    async fillEmail(email) {
        await this.emailInput.fill(email);
    }

    /**
     * Fill password field only
     * @param {string} password - User password
     */
    async fillPassword(password) {
        await this.passwordInput.fill(password);
    }

    /**
     * Click login button
     */
    async clickLogin() {
        await this.loginButton.click();
    }

    /**
     * Get error message text
     * @returns {Promise<string>} The error message
     */
    async getErrorMessage() {
        await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
        return await this.errorMessage.textContent();
    }

    /**
     * Check if error message is displayed
     */
    async isErrorDisplayed() {
        try {
            return await this.errorMessage.isVisible({ timeout: 3000 });
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if login was successful by looking for post-login elements
     */
    async isLoginSuccessful() {
        try {
            // Wait for either dashboard element or logout button to appear
            await this.page.waitForSelector('button:has-text("Logout"), .dashboard, h1', {
                state: 'visible',
                timeout: 5000
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Logout from the application
     */
    async logout() {
        if (await this.logoutButton.isVisible({ timeout: 2000 })) {
            await this.logoutButton.click();
        }
    }

    /**
     * Clear all input fields
     */
    async clearFields() {
        await this.emailInput.clear();
        await this.passwordInput.clear();
    }

    /**
     * Get email input value
     * @returns {Promise<string>} The email input value
     */
    async getEmailValue() {
        return await this.emailInput.inputValue();
    }

    /**
     * Get password input value
     * @returns {Promise<string>} The password input value
     */
    async getPasswordValue() {
        return await this.passwordInput.inputValue();
    }

    /**
     * Check if login button is enabled
     * @returns {Promise<boolean>} True if enabled
     */
    async isLoginButtonEnabled() {
        return await this.loginButton.isEnabled();
    }
}

module.exports = LoginPage;
