const fs = require('fs');
const path = require('path');

/**
 * DataReader - Utility to read test data from JSON files
 */
class DataReader {
    /**
     * Read JSON file and return parsed data
     * @param {string} fileName - Name of the JSON file (without path)
     * @returns {Object} Parsed JSON data
     */
    static readJsonFile(fileName) {
        const filePath = path.join(__dirname, '..', 'test-data', fileName);
        const rawData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(rawData);
    }

    /**
     * Get all valid login credentials
     * @returns {Array} Array of valid credential objects
     */
    static getValidCredentials() {
        const data = this.readJsonFile('loginData.json');
        return data.validCredentials;
    }

    /**
     * Get all invalid login credentials
     * @returns {Array} Array of invalid credential objects
     */
    static getInvalidCredentials() {
        const data = this.readJsonFile('loginData.json');
        return data.invalidCredentials;
    }

    /**
     * Get specific valid credential by role
     * @param {string} role - User role (admin, user, guest)
     * @returns {Object} Credential object
     */
    static getCredentialByRole(role) {
        const credentials = this.getValidCredentials();
        return credentials.find(cred => cred.expectedRole === role);
    }

    /**
     * Get error messages
     * @returns {Object} Error messages object
     */
    static getErrorMessages() {
        const data = this.readJsonFile('errorMessages.json');
        return data.errors;
    }

    /**
     * Get specific error message type
     * @param {string} errorType - Type of error (invalidEmail, invalidCredentials, etc.)
     * @returns {Array} Array of possible error messages
     */
    static getErrorMessagesByType(errorType) {
        const errors = this.getErrorMessages();
        return errors[errorType] || [];
    }

    /**
     * Get UI test data
     * @returns {Object} UI test data object
     */
    static getUITestData() {
        const data = this.readJsonFile('loginData.json');
        return data.uiTestData;
    }
}

module.exports = DataReader;
