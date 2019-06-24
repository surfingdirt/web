import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import BottomBarActionButton from 'Components/BottomBarActionButton';
import { getIcon } from 'Utils/icons';

import styles from './styles.scss';

const BottomBarActions = ({ className, items }) => {
  return (
    <div className={classnames(styles.wrapper, className)}>
      <ul className={styles.linkList}>
        {items.map((props) => {
          const buttonProps = Object.assign({}, props, { icon: getIcon(props.icon) });
          return (
            <li key={props.icon}>
              <BottomBarActionButton {...buttonProps} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

BottomBarActions.propTypes = {
  className: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default BottomBarActions;
