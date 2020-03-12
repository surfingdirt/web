import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import zones from './zones';
import styles from './styles.scss';

const currentZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const TimezoneField = ({ unsetLabel, className, onChange, ...inputAttrs }) => {
  const options = zones.map((zone) => (
    <option key={zone} value={zone}>
      {zone}
    </option>
  ));
  options.unshift(<option key="unset">{unsetLabel}</option>);

  const newAttrs = { ...inputAttrs };
  delete newAttrs.value;

  return (
    <select
      defaultValue={null}
      className={classnames(styles.select, className)}
      onChange={onChange}
      {...newAttrs}
    >
      {options}
    </select>
  );
};

TimezoneField.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  unsetLabel: PropTypes.string.isRequired,
};

TimezoneField.defaultProps = {
  className: null,
  onChange: null,
};

export default TimezoneField;
