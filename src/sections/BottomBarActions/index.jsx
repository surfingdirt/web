import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import PopupActionButton from 'Components/Widgets/PopupActionButton';
import { getIcon } from 'Utils/icons';

import styles from './styles.scss';

const HORIZONTAL_OFFSET = -40;

const RADIUS = 100;
const LABEL_ADDITIONAL_RADIUS = 40;
const START_ANGLE = 180 - 22.5;
const ANGULAR_DISTANCE = 45;

const BottomBarActionsRaw = ({ className, id, innerRef, items, origin }) => {
  const offsets = items.map((item, i) => {
    const angle = ((START_ANGLE - i * ANGULAR_DISTANCE) * Math.PI) / 180;
    const iconX = origin[0] + RADIUS * Math.cos(angle) + HORIZONTAL_OFFSET;
    const iconY = origin[1] - RADIUS * Math.sin(angle);

    const labelX = origin[0] + LABEL_ADDITIONAL_RADIUS * Math.cos(angle) + HORIZONTAL_OFFSET;
    const labelY = origin[1] - LABEL_ADDITIONAL_RADIUS * Math.sin(angle);

    return { iconX, iconY, labelX, labelY };
  });

  return (
    <div className={classnames(styles.wrapper, className)}>
      <ul className={styles.linkList} id={id} ref={innerRef}>
        {items.map((props, index) => {
          const { iconX, iconY, labelX, labelY } = offsets[index];
          const iconStyle = { transform: `translate(${iconX}px, ${iconY}px)` };
          const labelStyle = { transform: `translate(${labelX}px, ${labelY}px)` };

          const buttonProps = { active: props.active, style: iconStyle, to: props.to };
          const key = `action${index}`;

          return (
            <li key={key}>
              <PopupActionButton {...buttonProps}>
                <div>{getIcon({ type: props.icon, presentationOnly: true })}</div>
                <div className={styles.label} style={labelStyle}>
                  {props.label}
                </div>
              </PopupActionButton>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

BottomBarActionsRaw.propTypes = {
  className: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  innerRef: PropTypes.shape({
    current: PropTypes.instanceOf(typeof Element === 'undefined' ? () => {} : Element),
  }).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  origin: PropTypes.arrayOf(PropTypes.number).isRequired,
};

const BottomBarActions = React.forwardRef((props, ref) => (
  <BottomBarActionsRaw innerRef={ref} {...props} />
));
BottomBarActions.displayName = 'LinkNavigation';

export default BottomBarActions;
