/* eslint-disable jsx-a11y/label-has-for */

import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.scss';

const SelectField = ({ children, input, label }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.labelContainer}>
        <label htmlFor={input.name}>
          {label}
          {':'}
        </label>
      </div>
      <div className={styles.selectContainer}>
        <select {...input} id={input.name} name={input.name}>
          {children}
        </select>
      </div>
    </div>
  );
};

SelectField.propTypes = {
  children: PropTypes.node.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string,
  }),
  label: PropTypes.string,
  required: PropTypes.bool,
};

SelectField.defaultProps = {
  input: PropTypes.shape({
    name: PropTypes.string,
  }),
  label: PropTypes.string,
  required: true,
};

export default SelectField;
