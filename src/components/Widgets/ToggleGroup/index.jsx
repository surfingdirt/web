import React from 'react';
import { withRouter } from 'react-router';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const ToggleGroup = ({ history, items, location, name, onChange, selected }) => (
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
          disabled={selected === value}
          aria-pressed={selected === value}
          name={name}
          key={value}
          type="submit"
          value={value}
          title={label}
          aria-label={label}
          onClick={() => {
            const { search } = location;
            const query = new URLSearchParams(search);
            query.set(name, value);
            history.replace(`?${query.toString()}`);
            onChange(value);
          }}
        >
          {icon}
        </button>
      ))}
    </div>
  </form>
);

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

export default withRouter(ToggleGroup);
