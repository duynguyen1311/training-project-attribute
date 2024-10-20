const validator = require('validator');

class Helper {
    isValidEmail(email) {
        return validator.isEmail(email);
    }
    isValidPassword(password) {
        // At least 6 characters, 1 uppercase, and 1 special character
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;
        return passwordRegex.test(password);
    }

    isValidUsername(username) {
        // Alphanumeric, 3-20 characters
        const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
        return usernameRegex.test(username);
    }

    isValidId(id) {
        return validator.isInt(id.toString());
    }

    isValidString(str) {
        return typeof str === 'string' && str.trim().length > 0;
    }
    validateUserInput(data) {
        const errors = {};

        if (!data.username || !this.isValidUsername(data.username)) {
            errors.username = 'Invalid username. It should be 3-20 alphanumeric characters.';
        }

        if (!data.email || !this.isValidEmail(data.email)) {
            errors.email = 'Invalid email address.';
        }

        if (!data.password || !this.isValidPassword(data.password)) {
            errors.password = 'Invalid password. It should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.';
        }
        if (!data.username || !data.email || !data.password) {
            errors.required = 'Username, email, and password are required.';
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors: errors
        };
    }
    validateLoginInput(data) {
        const errors = {};

        if (!data.email) {
            errors.email = 'Email is required.';
        } else if (!this.isValidEmail(data.email)) {
            errors.email = 'Invalid email format.';
        }

        if (!data.password) {
            errors.password = 'Password is required.';
        } else if (data.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long.';
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors: errors
        };
    }
}

module.exports = new Helper();