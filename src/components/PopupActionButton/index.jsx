import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.scss';

const BottomBarActionButton = React.forwardRef(function BottomBarActionButton(
  { active, className, children, to },
  ref,
) {
  const Tag = to ? Link : 'span';

  return (
    <Tag
      ref={ref}
      type="button"
      to={to}
      className={classnames(styles.wrapper, className, { [styles.active]: active })}
    >
      {children}
    </Tag>
  );
});

BottomBarActionButton.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
};

BottomBarActionButton.defaultProps = {
  active: false,
  className: null,
  to: null,
};

export default BottomBarActionButton;
