import {ValidationError} from "./errors";

/**
 * Currency Value Object
 * 
 * @description
 * Represents a currency with a valid ISO 4217 code.
 */

class Currency {
    static #VALID_CODES = ['USD', 'EUR','GBP', 'JPY'];
    #code;

    /**
     * Creates a new Currency instance.
     * @param {string} code - The ISO 4217 currency code.
     * @throws {ValidationError} If the code is not valid.
     */
    constructor(code) {
        if (!Currency.#VALID_CODES.includes(code))
            throw new ValidationError(
                `Invalid currency code: ${code}. Valid codes are: ${Currency.#VALID_CODES.join(', ')}`);
        this.#code = code;
    }

    /**
     * Gets the currency code.
     * @returns {string} The ISO 4217 currency code.
     */
    get code() {
        return this.#code;
    }

    /**
     * Checks equality with another Currency instance.
     * @param {Currency} other - Another Currency instance.
     * @returns {boolean} True if both currencies have the same code, false otherwise.
     */
    equals(other) {
        return other instanceof Currency && this.#code === other.code;
    }
}