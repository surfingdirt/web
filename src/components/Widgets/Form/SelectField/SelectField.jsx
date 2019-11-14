/* eslint-disable jsx-a11y/label-has-for */

import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.scss';

const SelectField = ({ children, input, label, required, requiredLabel }) => {
  const { inputContainer, labelContainer, requiredElement, selectContainer, arrow } = styles;

  return (
    <div className={inputContainer}>
      <div className={labelContainer}>
        <label htmlFor={input.name}>{label}</label>
        {required && (
          <span className={requiredElement} aria-label={requiredLabel}>
            *
          </span>
        )}
      </div>
      <div className={selectContainer}>
        <select {...input} id={input.name} name={input.name}>
          {children}
        </select>
      </div>
    </div>
  );
};

SelectField.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
  }),
  label: PropTypes.string,
  required: PropTypes.bool,
  requiredLabel: PropTypes.string,
};

SelectField.defaultProps = {
  input: PropTypes.shape({
    name: PropTypes.string,
  }),
  label: PropTypes.string,
  required: true,
  requiredLabel: '',
};

export default SelectField;
