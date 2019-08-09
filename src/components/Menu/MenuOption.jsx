import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class MenuOptionRaw extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node.isRequired,
    disabledSelect: PropTypes.func,
    disabled: PropTypes.bool,
    handleBlur: PropTypes.func,
    handleKeys: PropTypes.func,
    innerRef: PropTypes.shape({
      current: PropTypes.instanceOf(typeof Element === 'undefined' ? () => {} : Element),
    }).isRequired,
    onCloseRequested: PropTypes.func,
    onSelect: PropTypes.func,
  };

  static defaultProps = {
    active: false,
    disabled: false,
    disabledSelect: null,
    handleBlur: null,
    handleKeys: null,
    onCloseRequested: null,
    onSelect: null,
  };

  constructor(props) {
    super(props);

    this.state = {};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { disabled, disabledSelect, onCloseRequested, onSelect } = this.props;

    if (disabled) {
      if (disabledSelect) {
        disabledSelect();
      }
      // Early return if disabled
      return;
    }
    if (onSelect) {
      onSelect();
    }
    if (onCloseRequested) {
      onCloseRequested();
    }
  }

  render() {
    const { active, children, disabled, handleBlur, handleKeys, innerRef } = this.props;

    const actualClassName = classnames(styles.menuOption, {
      [styles.menuOptionActive]: active,
      [styles.menuOptionDisabled]: disabled,
    });

    return (
      <div
        onClick={this.handleClick}
        onBlur={handleBlur}
        onKeyDown={handleKeys}
        className={actualClassName}
        role="menuitem"
        tabIndex="-1"
        aria-disabled={disabled}
        ref={innerRef}
      >
        {children}
      </div>
    );
  }
}

const MenuOption = React.forwardRef((props, ref) => <MenuOptionRaw innerRef={ref} {...props} />);
MenuOption.displayName = 'MenuOption';

export default MenuOption;
