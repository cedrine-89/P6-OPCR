export default class UserValidator {
    #regExpEmail = new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/);
    valid = {
        success: true,
        message: []
    };

    constructor(user) {
        this.validEmpty(user.email, 'email');
        this.validEmpty(user.password, 'password');
        if (!this.valid.message.find(m => m === 'email vide')) {
            this.validEmail(user.email);
        }
    }

    validEmail(value) {
        if (!this.#regExpEmail.test(value)) {
            this.valid.success = false;
            this.valid.message.push('email invalid');
        }
    }

    validEmpty(value, id) {
        if (value === ' ') {
            this.valid.success = false;
            this.valid.message.push(`${id} vide`);
        }
    }
}
