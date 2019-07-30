/* eslint-disable jsx-a11y/label-has-for */

import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import styles from './styles.scss';

const InputField = (props) => {
  const { input, meta, ...rest } = props;

  const { touched, error, submitError } = meta;
  const { label, id, placeholder, required, type } = rest;

  let displayError = null;
  if (submitError) {
    displayError = submitError;
  } else if (error && touched) {
    displayError = error;
  }

  return (
    <Fragment>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={styles.input}
        id={id}
        placeholder={placeholder}
        required={required}
        type={type}
        {...input}
      />
      {displayError && <span className={styles.error}>{displayError}</span>}
    </Fragment>
  );
};

InputField.propTypes = {
  errorLabel: PropTypes.string,
  input: PropTypes.shape({
    id: PropTypes.string,
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
    id: '',
  },
  label: '',
  placeholder: '',
  required: true,
  requiredLabel: '',
  type: '',
  validLabel: '',
};

export default InputField;
