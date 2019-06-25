import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import BottomBarActionButton from 'Components/BottomBarActionButton';
import { getIcon } from 'Utils/icons';

import styles from './styles.scss';

const RADIUS = 100;
const START_ANGLE = 180 - 22.5;
const ANGULAR_DISTANCE = 45;

const BottomBarActions = ({ className, items, onCloseRequest, open, origin }) => {
  const offsets = items.map((item, i) => {
    const angle = ((START_ANGLE - i * ANGULAR_DISTANCE) * Math.PI) / 180;
    const x = origin[0] + RADIUS * Math.cos(angle);
    const y = origin[1] - RADIUS * Math.sin(angle);

    return [x, y];
  });

  const backgroundStyle = { opacity: (open ? '1.0' : '0') };

  return (
    <div className={classnames(styles.wrapper, className)}>
      <div className={styles.overlay} style={backgroundStyle} onClick={onCloseRequest} />
      <ul className={styles.linkList}>
        {items.map((props, index) => {
          const [x, y] = offsets[index];
          const style = open ? { transform: `translate(${x}px, ${y}px)` } : {};
          const buttonProps = Object.assign({}, props, { icon: getIcon(props.icon) });

          return (
            <li key={props.icon} style={style}>
              <BottomBarActionButton {...buttonProps} onClick={onCloseRequest} />
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
  onCloseRequest: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  origin: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default BottomBarActions;
