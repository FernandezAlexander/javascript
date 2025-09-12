import {ValidationError} from "./errors";
import {Currency} from "./currency";

/**
 * Money Value Object
 * 
 * @description
 * Represents a monetary amount in a specific currency.
 * Ensures immutability and provides methods for arithmetic operations.
 * Validates that the amount is a non-negative finite number and that the currency is valid.
 * @example
 * ```javascript
 * const usd = new Currency('USD');
 * const money1 = new Money({ amount: 100.00, currency: usd });
 * const money2 = new Money({ amount: 50.00, currency: usd });
 * const total = money1.add(money2); // Money { amount: 150.00, currency: Currency { code: 'USD' } }
 * const doubled = money1.multiply(2); // Money { amount: 200.00, currency: Currency { code: 'USD' } }
 * ```
 */
export class Money {
    #amount;
    #currency;

    /**
     * Creates a new Money instance.
     * @param {Object} params   
     * @param {number} params.amount - The monetary amount (non-negative finite number).
     * @param {Currency} params.currency - The currency of the amount.
     * @throws {ValidationError} If the amount is not a non-negative finite number or if the currency is invalid.
     */
    constructor({ amount, currency }) {
        if (!Number.isFinite(amount) || amount < 0)
            throw new ValidationError('Amount must be a non-negative finite number');
        if (!currency instanceof Currency)
            throw new ValidationError(`Invalid currency: ${currency}`);
        this.#amount = Number(amount.toFixed(2)); 
        this.#currency = currency;
    }

    /**
     * Gets the monetary amount.
     * @returns {number} The monetary amount.
     */
    get amount() {
        return this.#amount;
    }

    /**
     * Gets the currency.
     * @returns {Currency} The currency of the amount.
     */
    get currency() {
        return this.#currency;
    }

    /**
     * Adds another Money instance to this one.
     * Both Money instances must have the same currency.
     * @param {Money} other - Another Money instance to add.
     * @returns {Money} A new Money instance representing the sum.
     * @throws {ValidationError} If the currencies do not match.
     */
    add(other) {
        if (!(other instanceof Money) || !this.#currency.equals(other.currency))
            throw new ValidationError('Can only add Money with the same currency');
        return new Money({
            amount: this.#amount + other.amount,
            currency: this.#currency
        });
    }

    /**
     * Multiplies the monetary amount by a non-negative finite number.
     * @param {number} multiplier - The non-negative finite number to multiply by.
     * @returns {Money} A new Money instance with the multiplied amount.
     * @throws {ValidationError} If the multiplier is not a non-negative finite number.
     */
    multiply(multiplier) {
        if (!(Number.isFinite(multiplier) || multiplier < 0))
            throw new ValidationError('Multiplier must be a non-negative finite number');
        return new Money({
            amount: this.#amount * multiplier,
            currency: this.#currency
        });
    }

    /**
     * Checks equality with another Money instance.
     * Two Money instances are equal if they have the same amount and currency.
     * @param {Money} other - Another Money instance.
     * @returns {boolean} True if both Money instances are equal, false otherwise.
     */
    equals(other) {
        return other instanceof Money &&
               this.#amount === other.amount &&
               this.#currency.equals(other.currency);
    }

    /**
     * Returns a string representation of the Money instance.
     * Format: "amount currencyCode" (e.g., "100.00 USD").
     * @returns {string} The string representation of the Money instance.
     */
    toString() {
        
        return `${this.#amount.toFixed(2)} ${this.#currency.code}`;
        
    }
    
}