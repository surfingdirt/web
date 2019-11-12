import React from 'react';

import styles from './styles.scss';

const CheckboxField = (data) => {
  const {
    input,
    label,
    type,
    meta: { touched, error, submitError },
  } = data;

  let displayError = null;

  if (submitError) {
    displayError = submitError;
  } else if (error && touched) {
    displayError = error;
  }

  return (
    <div className={styles.flexContainer}>
      <label htmlFor={input.name}>
        <input {...input} id={input.name} name={input.name} type={type} />
        {label}
      </label>
      {displayError && <span className={styles.displayErrorLabel}>{displayError}</span>}
    </div>
  );
};

export default CheckboxField;
