/* eslint-disable jsx-a11y/label-has-for */

import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import styles from './styles.scss';

const InputField = (props) => {
  const { input, meta, ...rest } = props;

  const { onChange: inputOnChange, ...inputAttrs } = input;
  const onChange = rest.onChange || inputOnChange;

  const { touched, error, submitError } = meta;

  const { className, id, label, placeholder, required, type } = rest;

  let displayError = null;
  if (submitError) {
    displayError = submitError;
  } else if (error && touched) {
    displayError = error;
  }

  return (
    <div className={styles.wrapper}>
      <label className={styles.error} htmlFor={id}>
        {displayError}
      </label>
      <div className={styles.inputAndError}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        <input
          className={classnames(styles.input, className)}
          id={id}
          placeholder={placeholder}
          required={required}
          type={type}
          onChange={onChange}
          {...inputAttrs}
        />
      </div>
    </div>
  );
};

InputField.propTypes = {
  input: PropTypes.shape({
    className: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
};

InputField.defaultProps = {
  input: {
    className: null,
    name: '',
    id: '',
  },
  label: '',
  placeholder: '',
  required: true,
  type: '',
};

export default InputField;
