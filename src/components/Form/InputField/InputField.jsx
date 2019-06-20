/* eslint-disable jsx-a11y/label-has-for */

import classnames from 'classnames';

import SVG from 'Components/SVG';

import Completed from 'Images/_old/completed.svg';
import Empty from 'Images/_old/empty.svg';
import Error from 'Images/_old/error.svg';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import formStyles from '../styles.scss';

import styles from './styles.scss';

const InputField = (data) => {
  const {
    errorLabel,
    input,
    label,
    meta: { touched, error, submitError },
    placeholder,
    required,
    requiredLabel,
    type,
    validLabel,
  } = data;

  const {
    inputContainer,
    labelContainer,
    requiredElement,
    displayErrorLabel,
    emptyIcon,
    errorIcon,
    completedIcon,
  } = styles;

  let iconType = Empty;
  let iconLabel = '';
  let iconClassName = emptyIcon;
  let presentationOnly = true;
  if (touched) {
    iconType = error ? Error : Completed;
    iconClassName = error ? errorIcon : completedIcon;
    iconLabel = error ? errorLabel : validLabel;
    presentationOnly = false;
  }

  let displayError = null;
  if (submitError) {
    displayError = submitError;
  } else if (error && touched) {
    displayError = error;
  }

  return (
    <Fragment>
      <div className={inputContainer}>
        <div className={labelContainer}>
          <label htmlFor={input.name}>{label}</label>
          {required && (
            <span className={requiredElement} aria-label={requiredLabel}>
              *
            </span>
          )}
        </div>
        <input
          {...input}
          id={input.name}
          name={input.name}
          placeholder={placeholder}
          required={required}
          type={type}
        />
        <span className={styles.inputStatus}>
          <SVG
            className={classnames(formStyles.validationIcon, iconClassName)}
            icon={iconType}
            hollow
            label={iconLabel}
            presentationOnly={presentationOnly}
          />
        </span>
      </div>
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
