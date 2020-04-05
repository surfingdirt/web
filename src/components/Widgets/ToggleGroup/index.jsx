import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const ToggleGroup = ({ items, name, onChange, selected }) => {
  return (
    <form
      className={styles.wrapper}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className={styles.background}>
        {items.map(({ icon, label, value }) => (
          <button
            className={classnames(styles.button, { [styles.selected]: selected === value })}
            name={name}
            key={value}
            type="submit"
            value={value}
            aria-label={label}
            onClick={() => {
              onChange(value);
            }}
          >
            {icon}
          </button>
        ))}
      </div>
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
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
};

ToggleGroup.defaultProps = {
  name: 'toggle',
};

export default ToggleGroup;
