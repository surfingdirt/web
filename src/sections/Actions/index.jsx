import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import ActionLink from 'Components/Widgets/ActionLink';

import styles from './styles.scss';

const Actions = ({ className, items, label }) => {
  return (
    <nav className={classnames(styles.wrapper, className)} aria-label={label}>
      <ul className={styles.linkList}>
        {items.map((item) => (
          <li key={item.to}>
            <ActionLink {...item} className={styles.actionLink} iconClassName={styles.icon} />
          </li>
        ))}
      </ul>
    </nav>
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
