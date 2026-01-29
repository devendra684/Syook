# ShopHub Pro - Login Automation Framework

This is an automated testing framework for ShopHub Pro's login functionality, built with Playwright and JavaScript using the Page Object Model pattern.

## Overview

This framework tests the login functionality of the ShopHub Pro e-commerce application. I've implemented it using Playwright's test runner along with POM design pattern to keep the tests maintainable and easy to extend.

**Application URL:** https://bugbash.syook.com/

## Features

- Page Object Model (POM) for better code organization
- Data-driven testing using JSON files
- Cross-browser support (Chrome, Firefox, Safari)
- Parallel test execution for faster results
- Automatic waiting (no manual waits needed)
- HTML reports with screenshots and videos for failed tests

## Prerequisites

You'll need:

- Node.js (version 18 or higher)
- npm (version 9 or higher)

## Installation

1. Clone the repository and navigate to the project folder:

   ```bash
   cd d:\Practice\Syook
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## 📁 Project Structure

```
d:\Practice\Syook\
├── pages/                      # Page Object Model classes
│   ├── BasePage.js            # Base class with common functionality
│   └── LoginPage.js           # Login page object with locators and methods
├── tests/                      # Test specifications
│   └── login.spec.js          # Login functionality test suite
├── test-data/                  # Test data files
│   ├── loginData.json         # Valid and invalid credentials
│   └── errorMessages.json     # Expected error messages
├── config/                     # Configuration files
│   └── testConfig.js          # Centralized test configuration
├── utils/                      # Utility functions
│   └── dataReader.js          # JSON data reader utility
├── playwright.config.js        # Playwright configuration
├── package.json               # Project dependencies and scripts
└── README.md                  # This file
```

## 🧪 Running Tests

### Run all tests (headless mode, all browsers):

```bash
npm test
```

### Run tests in headed mode (visible browser):

```bash
npm run test:headed
```

### Run tests on specific browser:

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Run tests in debug mode:

```bash
npm run test:debug
```

### Run tests with UI mode (interactive):

```bash
npm run test:ui
```

### Run specific test file:

```bash
npx playwright test tests/login.spec.js
```

### Run tests with specific number of workers:

```bash
npx playwright test --workers=3
```

## 📝 Test Scenarios

### ✅ Positive Login Scenarios

- Admin user login (`admin@shophub.com`)
- Regular user login (`user@example.com`)
- Guest user login (`guest@demo.com`)
- Data-driven tests for all valid credentials

### ❌ Negative Login Scenarios

- Invalid email format
- Wrong password
- Empty email field
- Empty password field
- Both fields empty
- Non-existent user
- Special characters in credentials
- Very long email addresses

### 🔍 Error Message Validation

- Verify error messages display correctly
- Validate error message content
- Check error message visibility

### 🖥️ UI Element Validation

- Email input field visibility and functionality
- Password input field visibility and functionality
- Login button state and interaction
- Input field value verification

### 🌐 Cross-Browser Compatibility

- Consistent behavior across Chromium, Firefox, and WebKit
- Browser-specific logging for debugging

## 📊 Viewing Reports

After test execution, view the HTML report:

```bash
npm run report
```

The report includes:

- Test execution summary
- Pass/fail status for each test
- Screenshots for failed tests
- Videos for failed tests
- Execution time and browser information

Reports are generated in the `playwright-report/` directory.

## 🛠️ Framework Features

### Page Object Model (POM)

- **BasePage.js**: Common methods for all pages (navigation, element interaction)
- **LoginPage.js**: Login-specific locators and methods

### Data-Driven Testing

- Test data stored in JSON files (`test-data/`)
- Easy to add new test cases without modifying code
- Centralized data management

### Auto-Waiting

- No `setTimeout()` or `sleep()` calls
- Playwright automatically waits for elements to be ready
- Configurable timeout values in `playwright.config.js`

### Parallel Execution

- Tests run in parallel by default
- Configurable worker count
- Faster test execution

### Failure Artifacts

- Screenshots captured on failure
- Videos recorded for failed tests
- Traces available for debugging

## ⚙️ Configuration

### Playwright Configuration (`playwright.config.js`)

- **Base URL**: `https://bugbash.syook.com`
- **Timeout**: 30 seconds per test
- **Retries**: 0 locally, 2 on CI
- **Browsers**: Chromium, Firefox, WebKit
- **Reporters**: HTML and List
- **Artifacts**: Screenshots and videos on failure

### Test Configuration (`config/testConfig.js`)

- Centralized timeout values
- Retry policies
- Browser settings
- Artifact configurations

## 🔧 Troubleshooting

### Issue: Browsers not installed

**Solution:**

```bash
npx playwright install
```

### Issue: Tests failing due to timeout

**Solution:** Increase timeout in `playwright.config.js`:

```javascript
timeout: 60 * 1000, // 60 seconds
```

### Issue: Cannot find test data

**Solution:** Ensure JSON files exist in `test-data/` directory with correct format.

### Issue: Tests pass locally but fail on CI

**Solution:** Check retry configuration in `playwright.config.js` and ensure CI has sufficient resources.

### Issue: Locators not found

**Solution:**

- Verify the application is accessible at `https://bugbash.syook.com`
- Check if page structure has changed
- Update locators in `pages/LoginPage.js` if needed

## 📧 Test Accounts

The following test accounts are used:

| Role  | Email             | Password |
| ----- | ----------------- | -------- |
| Admin | admin@shophub.com | admin123 |
| User  | user@example.com  | user123  |
| Guest | guest@demo.com    | guest123 |

## 🎓 Best Practices -

1. **Always use Page Objects** - Never interact with elements directly in tests
2. **Leverage auto-waiting** - Avoid hard waits and sleeps
3. **Use data-driven approach** - Store test data in JSON files
4. **Run tests in parallel** - Utilize multiple workers for faster execution
5. **Review failure artifacts** - Check screenshots and videos for debugging
6. **Keep tests independent** - Each test should be able to run standalone

## 📄 License -

ISC

---

**Created for:** QA Technical Challenge - Problem Statement 2  
**Framework:** Playwright with JavaScript  
**Pattern:** Page Object Model (POM)  
**Application:** ShopHub Pro Login Functionality

---

## Notes

This framework was built as part of a QA automation assignment.
