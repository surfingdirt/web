import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import ActionLink from 'Components/ActionLink';

import styles from './styles.scss';

const Actions = ({ className, items }) => {
  return (
    <aside className={classnames(styles.wrapper, className)}>
      <ul className={styles.linkList}>
        {items.map((props) => (
          <li key={props.to}>
            <ActionLink {...props} />
          </li>
        ))}
      </ul>
    </aside>
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
};

export default Actions;
