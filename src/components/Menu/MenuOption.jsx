import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class MenuOption extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node.isRequired,
    disabledSelect: PropTypes.func,
    disabled: PropTypes.bool,
    internalFocus: PropTypes.func,
    internalSelect: PropTypes.func,
    onSelect: PropTypes.func,
    role: PropTypes.string,
  };

  static defaultProps = {
    active: false,
    disabled: false,
    disabledSelect: null,
    internalFocus: null,
    internalSelect: null,
    onSelect: null,
    role: 'menuitem',
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  notifyDisabledSelect() {
    const { disabledSelect } = this.props;
    if (disabledSelect) {
      disabledSelect();
    }
  }

  onSelect() {
    const { disabled, internalSelect, onSelect } = this.props;

    if (disabled) {
      this.notifyDisabledSelect();
      // Early return if disabled
      return;
    }
    if (onSelect) {
      onSelect();
    }
    internalSelect();
  }

  handleKeyUp(e) {
    if (e.key === ' ') {
      this.onSelect();
    }
  }

  handleKeyDown(e) {
    e.preventDefault();
    if (e.key === 'Enter') {
      this.onSelect();
    }
  }

  handleClick() {
    this.onSelect();
  }

  handleHover() {
    const { internalFocus, index } = this.props;
    internalFocus(index);
  }

  render() {
    const {
      active,
      disabled,
      role,
      children,
    } = this.props;

    const actualClassName = classnames(styles.menuOption, {
      [styles.menuOptionActive]: active,
      [styles.menuOptionDisabled]: disabled,
    });

    return (
      <div
        onClick={this.handleClick}
        onKeyUp={this.handleKeyUp}
        onKeyDown={this.handleKeyDown}
        onMouseOver={this.handleHover}
        className={actualClassName}
        role={role}
        tabIndex="-1"
        aria-disabled={disabled}
      >
        {children}
      </div>
    );
  }
}

export default MenuOption;
