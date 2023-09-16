import React from 'react';

function Validator({ value, rules }) {
    const isValidEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };
    const isValidPhoneNumber = (phoneNumber) => {
        const phonePattern = /^\d{10}$/;
        return phonePattern.test(phoneNumber);
    };
    const isValidCountryCode = (countryCode) => {
        const countryCodePattern = /^\d{2}$/;
        return countryCodePattern.test(countryCode);
    };
    const isNum = (number) =>{
        const numberRegex = /^\d+$/;
        return numberRegex.test(number)
    }
    const validate = () => {
        if (rules.required && value.trim() === '') {
            return 'This field is required.';
        }
        if (rules.noNumbers && /\d/.test(value)) {
            return 'Numbers are not allowed.';
        }
        if (rules.email && !isValidEmail(value)) {
            return 'Invalid email address.';
        }
        if (rules.phoneNumber && (!isValidPhoneNumber(value) || value.length !== 10)) {
            return 'Invalid phone number (10 digits required).';
        }
        if (rules.countryCode && !isValidCountryCode(value)) {
            return 'Invalid country code (2 digits required).';
        }
        if (rules.isNum && !isNum(value)){
            return 'Invalid (number required).';
        }
        return null;
    };
    const errorMessage = validate();
    return (
        <div className="error-message">
            {errorMessage && <span>{errorMessage}</span>}
        </div>
    );
}
export default Validator;
