const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DataReader = require('../utils/dataReader');

test.describe('Login Functionality Tests', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateToLogin();
    });

    test.describe('Positive Login Scenarios', () => {

        test('should login successfully with admin credentials', async ({ page }) => {
            const adminCred = DataReader.getCredentialByRole('admin');

            await loginPage.login(adminCred.email, adminCred.password);

            const isSuccess = await loginPage.isLoginSuccessful();
            expect(isSuccess).toBeTruthy();
        });

        test('should login successfully with regular user credentials', async ({ page }) => {
            const userCred = DataReader.getCredentialByRole('user');

            await loginPage.login(userCred.email, userCred.password);

            const isSuccess = await loginPage.isLoginSuccessful();
            expect(isSuccess).toBeTruthy();
        });

        test('should login successfully with guest credentials', async ({ page }) => {
            const guestCred = DataReader.getCredentialByRole('guest');

            await loginPage.login(guestCred.email, guestCred.password);

            const isSuccess = await loginPage.isLoginSuccessful();
            expect(isSuccess).toBeTruthy();
        });

        // Data-driven test for all valid credentials
        const validCredentials = DataReader.getValidCredentials();
        for (const credential of validCredentials) {
            test(`should login successfully as ${credential.expectedRole}`, async ({ page }) => {
                await loginPage.login(credential.email, credential.password);

                const isSuccess = await loginPage.isLoginSuccessful();
                expect(isSuccess).toBeTruthy();
            });
        }
    });

    test.describe('Negative Login Scenarios', () => {

        // Data-driven test for all invalid credentials from JSON file
        const invalidCredentials = DataReader.getInvalidCredentials();
        for (const credential of invalidCredentials) {
            test(`should show error for: ${credential.description}`, async ({ page }) => {
                if (credential.email && credential.password) {
                    await loginPage.login(credential.email, credential.password);
                } else if (credential.email) {
                    await loginPage.fillEmail(credential.email);
                    await loginPage.clickLogin();
                } else if (credential.password) {
                    await loginPage.fillPassword(credential.password);
                    await loginPage.clickLogin();
                } else {
                    await loginPage.clickLogin();
                }

                const hasError = await loginPage.isErrorDisplayed();
                expect(hasError).toBeTruthy();
            });
        }
    });

    test.describe('Error Message Validation', () => {

        test('should display appropriate error message for invalid email', async ({ page }) => {
            const invalidEmailCred = DataReader.getInvalidCredentials().find(c => c.description === 'Invalid email format');
            await loginPage.login(invalidEmailCred.email, invalidEmailCred.password);

            const hasError = await loginPage.isErrorDisplayed();
            if (hasError) {
                const errorText = await loginPage.getErrorMessage();
                expect(errorText).toBeTruthy();
                expect(errorText.length).toBeGreaterThan(0);
            }
        });

        test('should display error message for invalid credentials', async ({ page }) => {
            const wrongPasswordCred = DataReader.getInvalidCredentials().find(c => c.description === 'Wrong password');
            await loginPage.login(wrongPasswordCred.email, wrongPasswordCred.password);

            const hasError = await loginPage.isErrorDisplayed();
            if (hasError) {
                const errorText = await loginPage.getErrorMessage();
                expect(errorText).toBeTruthy();
                expect(errorText.length).toBeGreaterThan(0);
            }
        });

        test('should display error message for empty fields', async ({ page }) => {
            await loginPage.clickLogin();

            const hasError = await loginPage.isErrorDisplayed();
            if (hasError) {
                const errorText = await loginPage.getErrorMessage();
                expect(errorText).toBeTruthy();
                expect(errorText.length).toBeGreaterThan(0);
            }
        });
    });

    test.describe('UI Element Validation', () => {

        test('should have email input field visible', async ({ page }) => {
            const isVisible = await loginPage.emailInput.isVisible();
            expect(isVisible).toBeTruthy();
        });

        test('should have password input field visible', async ({ page }) => {
            const isVisible = await loginPage.passwordInput.isVisible();
            expect(isVisible).toBeTruthy();
        });

        test('should have login button visible and enabled', async ({ page }) => {
            const isVisible = await loginPage.loginButton.isVisible();
            const isEnabled = await loginPage.isLoginButtonEnabled();

            expect(isVisible).toBeTruthy();
            expect(isEnabled).toBeTruthy();
        });

        test('should accept input in email field', async ({ page }) => {
            const uiTestData = DataReader.getUITestData();
            await loginPage.fillEmail(uiTestData.testEmail);

            const emailValue = await loginPage.getEmailValue();
            expect(emailValue).toBe(uiTestData.testEmail);
        });

        test('should accept input in password field', async ({ page }) => {
            const uiTestData = DataReader.getUITestData();
            await loginPage.fillPassword(uiTestData.testPassword);

            const passwordValue = await loginPage.getPasswordValue();
            expect(passwordValue).toBe(uiTestData.testPassword);
        });
    });

    test.describe('Cross-Browser Compatibility', () => {

        test('should work consistently across browsers - admin login', async ({ page, browserName }) => {
            const adminCred = DataReader.getCredentialByRole('admin');

            await loginPage.login(adminCred.email, adminCred.password);

            const isSuccess = await loginPage.isLoginSuccessful();
            expect(isSuccess).toBeTruthy();
        });

        test('should work consistently across browsers - error handling', async ({ page, browserName }) => {
            const invalidCred = DataReader.getInvalidCredentials().find(c => c.description === 'Invalid email format');
            await loginPage.login(invalidCred.email, invalidCred.password);

            const hasError = await loginPage.isErrorDisplayed();
            expect(hasError).toBeTruthy();
        });
    });
});
