import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import messages from './messages';
import styles from './styles.scss';

const ToggleGroup = ({ items, name, onSubmit, selected }) => {
  return (
    <form
      className={styles.wrapper}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {items.map(({ icon, label, value }) => (
        <button
          className={classnames(styles.button, { [styles.selected]: selected === value })}
          name={name}
          key={value}
          type="submit"
          value={value}
          aria-label={label}
          onClick={() => {
            onSubmit(value);
          }}
        >
          {icon}
        </button>
      ))}
    </form>
  );
};

ToggleGroup.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  name: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
};

ToggleGroup.defaultProps = {
  name: 'toggle',
};

export default ToggleGroup;
