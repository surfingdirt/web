import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import BottomBarActionButton from 'Components/BottomBarActionButton';
import { getIcon } from 'Utils/icons';

import styles from './styles.scss';

// TODO: calculer les offsets de facon dynamique
const offsets = [
  [-40, -80],
  [ 20, -150],
  [120, -150],
];

const BottomBarActions = ({ className, items, onNavigation, open }) => {
  return (
    <div className={classnames(styles.wrapper, className)}>
      <ul className={styles.linkList}>
        {items.map((props, index) => {
          const [x, y] = offsets[index];
          const style = open ? {transform: `translate(${x}px, ${y}px)`} : {};
          const buttonProps = Object.assign({}, props, { icon: getIcon(props.icon) });

          return (
            <li key={props.icon} style={style}>
              <BottomBarActionButton {...buttonProps} onClick={onNavigation} />
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
  onNavigation: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default BottomBarActions;
