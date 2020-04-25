import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { keys } from './constants';
import styles from './styles.scss';

const { ENTER, SPACE } = keys;

class MenuTriggerRaw extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    innerRef: PropTypes.shape({
      current: PropTypes.instanceOf(typeof Element === 'undefined' ? () => {} : Element),
    }).isRequired,
    menuActive: PropTypes.bool.isRequired,
    menuId: PropTypes.string.isRequired,
    onToggleActive: PropTypes.func.isRequired,
    triggerLabel: PropTypes.string.isRequired,
  };

  static defaultProps = {
    className: null,
  };

  constructor(props) {
    super(props);

    this.toggleActive = this.toggleActive.bind(this);
  }

  toggleActive() {
    const { onToggleActive } = this.props;
    onToggleActive(!this.innerRef.current().checked);
  }

  render() {
    const { children, className, innerRef, menuActive, menuId, triggerLabel } = this.props;

    const actualClassName = classnames(
      styles.menuTrigger,
      className,
      menuActive ? styles.menuTriggerActive : styles.menuTriggerInactive,
    );

    const checkboxId = `${menuId}-input`;

    return (
      <>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label className={actualClassName} htmlFor={checkboxId}>
          {children}
        </label>
        <input
          ref={innerRef}
          tabIndex="0"
          role="button"
          aria-owns={menuId}
          aria-haspopup="true"
          aria-label={triggerLabel}
          className={styles.menuCheckbox}
          type="checkbox"
          id={checkboxId}
        />
      </>
    );
  }
}

const MenuTrigger = React.forwardRef((props, ref) => <MenuTriggerRaw innerRef={ref} {...props} />);
MenuTrigger.displayName = 'MenuTrigger';

export default MenuTrigger;
