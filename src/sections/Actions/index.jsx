import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import ActionLink from 'Components/Widgets/ActionLink';

import styles from './styles.scss';

const Actions = ({ className, items, label }) => {
  return (
    <div className={classnames(styles.wrapper, className)} aria-label={label} role="none">
      <ul className={styles.linkList} role="none">
        {items.map((item) => (
          <li key={item.to} role="none">
            <ActionLink
              {...item}
              className={styles.actionLink}
              iconClassName={styles.icon}
              role="menuitem"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

Actions.propTypes = {
  className: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  label: PropTypes.string.isRequired,
};

export default Actions;
