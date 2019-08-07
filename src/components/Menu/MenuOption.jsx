import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class MenuOption extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node.isRequired,
    onSelect: PropTypes.func.isRequired,
    onDisabledSelect: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    role: PropTypes.string,
  };

  static defaultProps = {
    active: false,
    disabled: false,
    role: 'menuitem',
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  notifyDisabledSelect() {
    if (this.props.onDisabledSelect) {
      this.props.onDisabledSelect();
    }
  }

  onSelect() {
    const { disabled, onSelect, _internalSelect } = this.props;

    if (disabled) {
      this.notifyDisabledSelect();
      // Early return if disabled
      return;
    }
    if (onSelect) {
      onSelect();
    }
    _internalSelect();
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
    const { _internalFocus, index } = this.props;
    _internalFocus(index);
  }

  render() {
    const { active, disabled, role, children, ...otherProps } = this.props;

    const actualClassName = classnames(styles.menuOption, {
      [styles.menuOptionActive]: active,
      [styles.menuOptionDisabled]: disabled,
    });

    return (
      <div
        {...otherProps}
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
