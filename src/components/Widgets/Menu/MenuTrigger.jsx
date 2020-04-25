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

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  toggleActive(e) {
    e.preventDefault();
    const { onToggleActive, menuActive } = this.props;
    onToggleActive(!menuActive);
  }

  handleKeyUp(e) {
    if (e.key === SPACE) {
      this.toggleActive(e);
    }
  }

  handleKeyDown(e) {
    if (e.key === ENTER) {
      this.toggleActive(e);
    }
  }

  handleClick(e) {
    this.toggleActive(e);
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
        <label className={actualClassName} htmlFor={checkboxId} aria-label={triggerLabel}>
          {children}
        </label>
        <input
          aria-haspopup="true"
          aria-owns={menuId}
          className={styles.menuCheckbox}
          id={checkboxId}
          onClick={this.handleClick}
          onKeyUp={this.handleKeyUp}
          onKeyDown={this.handleKeyDown}
          ref={innerRef}
          role="button"
          tabIndex="0"
          type="checkbox"
        />
      </>
    );
  }
}

const MenuTrigger = React.forwardRef((props, ref) => <MenuTriggerRaw innerRef={ref} {...props} />);
MenuTrigger.displayName = 'MenuTrigger';

export default MenuTrigger;
