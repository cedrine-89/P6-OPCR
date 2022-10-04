/**
 * UserValidator
 * Valid is not Empty
 * Valid Email format
 * IF Error => Push message in valid.message[]
 */
export default class UserValidator {
    #regExpEmail = new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/);
    valid = {
        success: true,
        message: []
    };

    constructor(user) {
        this.#validEmpty(user.email, 'email');
        this.#validEmpty(user.password, 'password');
        // Control Email is not empty for test is valid
        if (!this.valid.message.find(m => m === 'email vide')) {
            this.#validEmail(user.email);
        }
    }

    /**
     * Validator Email format to RegExp
     * @param value
     */
    #validEmail(value) {
        if (!this.#regExpEmail.test(value)) {
            this.valid.success = false;
            this.valid.message.push('email invalid');
        }
    }

    /**
     * Validator is not empty
     * @param value
     * @param id
     */
    #validEmpty(value, id) {
        if (value === ' ') {
            this.valid.success = false;
            this.valid.message.push(`${id} vide`);
        }
    }
}
