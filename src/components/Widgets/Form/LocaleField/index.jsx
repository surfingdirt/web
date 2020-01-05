import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import translatedLocales from './translatedLocales';
import styles from './styles.scss';
import AppContext from '~/contexts';

const LocaleField = ({ unsetLabel, className, onChange, ...inputAttrs }) => {
  let currentLocale = null;
  try {
    currentLocale = new Intl.NumberFormat().resolvedOptions().locale;
  } catch (e) {
    console.error('Could not determine locale');
  }

  const { availableLocales } = useContext(AppContext);

  const options = availableLocales.map((locale) => (
    <option key={locale} value={locale}>
      {translatedLocales[locale] || locale}
    </option>
  ));
  options.unshift(<option key="unset">{unsetLabel}</option>);

  const newAttrs = { ...inputAttrs };
  delete newAttrs.value;

  return (
    <select
      defaultValue={currentLocale}
      className={classnames(styles.select, className)}
      onChange={onChange}
      {...newAttrs}
    >
      {options}
    </select>
  );
};

LocaleField.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  unsetLabel: PropTypes.string.isRequired,
};

LocaleField.defaultProps = {
  className: null,
  onChange: null,
};

export default LocaleField;
