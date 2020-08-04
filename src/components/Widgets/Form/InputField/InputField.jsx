/* eslint-disable jsx-a11y/label-has-for */

import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import DualContainer from 'Components/Widgets/DualContainer';
import AlbumContributions from 'Components/Widgets/Form/AlbumContributions';
import AlbumVisibility from 'Components/Widgets/Form/AlbumVisibility';
import LocaleField from 'Components/Widgets/Form/LocaleField';
import TimezoneField from 'Components/Widgets/Form/TimezoneField';

import styles from './styles.scss';

const InputField = (props) => {
  const { input, meta, ...rest } = props;

  const { onChange: inputOnChange, ...inputAttrs } = input;
  const { type } = inputAttrs;
  const onChange = rest.onChange || inputOnChange;

  const { touched, error, submitError } = meta;

  const { className, id, initialError, label, placeholder, required } = rest;
  console.log({ name: input.name, error, initialError });
  let displayError = null;
  if (submitError) {
    displayError = submitError;
  } else if (error && touched) {
    displayError = error;
  } else if (initialError && !touched) {
    displayError = initialError;
  }

  let content;
  switch (type) {
    case 'albumContributions':
      content = (
        <AlbumContributions
          id={id}
          className={classnames(styles.input, className)}
          onChange={onChange}
          {...inputAttrs}
        />
      );
      break;
    case 'albumVisibility':
      content = (
        <AlbumVisibility
          id={id}
          className={classnames(styles.input, className)}
          onChange={onChange}
          {...inputAttrs}
        />
      );
      break;
    case 'locale':
      content = (
        <LocaleField
          id={id}
          className={classnames(styles.input, className)}
          onChange={onChange}
          unsetLabel={rest.unsetLabel}
          {...inputAttrs}
        />
      );
      break;
    case 'timezone':
      content = (
        <TimezoneField
          id={id}
          className={classnames(styles.input, className)}
          onChange={onChange}
          unsetLabel={rest.unsetLabel}
          {...inputAttrs}
        />
      );
      break;
    case 'textarea':
      content = (
        <textarea
          className={classnames(styles.input, className)}
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          {...inputAttrs}
        />
      );
      break;
    default:
      content = (
        <input
          className={classnames(styles.input, className)}
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          type={type}
          {...inputAttrs}
        />
      );
      break;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputAndError}>
        <DualContainer>
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
          {displayError && (
            <label className={styles.error} htmlFor={id}>
              {displayError}
            </label>
          )}
        </DualContainer>
        {content}
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
