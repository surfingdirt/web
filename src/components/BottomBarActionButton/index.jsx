import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.scss';

const BottomBarActionButton = React.forwardRef(function BottomBarActionButton(
  { active, className, children, onClick, to },
  ref,
) {
  const Tag = to ? Link : 'button';

  return (
    <Tag
      ref={ref}
      type="button"
      onClick={onClick}
      to={to}
      className={classnames(className, styles.wrapper, { [styles.active]: active })}
    >
      {children}
    </Tag>
  );
});

BottomBarActionButton.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  to: PropTypes.string,
};

BottomBarActionButton.defaultProps = {
  active: false,
  className: null,
  onClick: null,
  to: null,
};

export default BottomBarActionButton;
