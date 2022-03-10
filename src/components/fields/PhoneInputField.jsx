import 'react-phone-number-input/style.css';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import PropTypes from 'prop-types';
import { getIn } from 'formik';

const PhoneInputField = (props) => {
    const {
        className,
        field: { name, value },
        form: {
            errors, handleBlur, setFieldValue, touched, setTouched,
        },
        country,
        onChange,
        disabled = false,
    } = props;

    const [isFocused, setFocused] = useState(false);
    const isError = touched[name] && errors[name];
    const errorStyle = isError ? 'error' : '';
    const filledStyle = (isFocused || value) ? 'filled' : '';
    const disabledStyle = disabled ? 'disabledPhoneInput' : '';

    const handleInputBlur = (e) => {
        setFocused(false);
        handleBlur(e);
        console.log(setTouched);
        setTouched({[name]: true}, true)
    };

    const handleInputFocus = () => setFocused(true);

    const onValueChange = (phoneNumber) => {
        setFieldValue(name, phoneNumber);

        if (onChange !== null) {
            onChange(phoneNumber);
        }
    };

    return (
        <div className={`${className} ${errorStyle} ${filledStyle} ${disabledStyle} text-input-group`}>
            <PhoneInput
                disabled={disabled}
                placeholder="Lütfen telefon numaranızı girin."
                name={name}
                value={value}
                onChange={onValueChange}
                country={country}
                onBlur={handleBlur}
                className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text phone-input-container"
            />
            <div className="flex h-5 items-end text-red-100 text-xs">
                {isError && getIn(errors, name)}
            </div>
        </div>
    );
};


PhoneInputField.propTypes = {
    className: PropTypes.string,
    form: PropTypes.any.isRequired,
    field: PropTypes.any.isRequired,
    onChange: PropTypes.func,
    label: PropTypes.string,
    country: PropTypes.string,
    disabled: PropTypes.bool,
};

PhoneInputField.defaultProps = {
    className: '',
    onChange: null,
    country: 'tr_TR',
    disabled: false,
};

export default PhoneInputField;
