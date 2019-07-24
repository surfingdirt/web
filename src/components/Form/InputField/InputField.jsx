/* eslint-disable jsx-a11y/label-has-for */

import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import styles from './styles.scss';

const InputField = (data) => {
  const {
    input,
    label,
    meta: { touched, error, submitError },
    placeholder,
    required,
    type,
  } = data;

  const {
    displayErrorLabel,
  } = styles;

  let displayError = null;
  if (submitError) {
    displayError = submitError;
  } else if (error && touched) {
    displayError = error;
  }

  return (
    <Fragment>
      <label htmlFor={input.name}>{label}</label>
      <input
        {...input}
        id={input.name}
        name={input.name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
      {displayError && <span className={displayErrorLabel}>{displayError}</span>}
    </Fragment>
  );
};

InputField.propTypes = {
  errorLabel: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string,
  }),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  requiredLabel: PropTypes.string,
  type: PropTypes.string,
  validLabel: PropTypes.string,
};

InputField.defaultProps = {
  errorLabel: '',
  input: {
    name: '',
  },
  label: '',
  placeholder: '',
  required: true,
  requiredLabel: '',
  type: '',
  validLabel: '',
};

export default InputField;
