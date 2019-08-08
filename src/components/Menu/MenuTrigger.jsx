import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const KEY_ENTER = 'Enter';
const ROLE_BUTTON = 'button';

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

  toggleActive() {
    this.props.onToggleActive(!this.props.menuActive);
  }

  handleKeyUp(e) {
    if (e.key === ' ') {
      this.toggleActive();
    }
  }

  handleKeyDown(e) {
    if (e.key === KEY_ENTER) this.toggleActive();
  }

  handleClick() {
    this.toggleActive();
  }

  render() {
    const { children, className, innerRef, menuActive, menuId } = this.props;

    const actualClassName = classnames(
      styles.menuTrigger,
      className,
      menuActive ? styles.menuTriggerActive : styles.menuTriggerInactive,
    );

    return (
      <div
        ref={innerRef}
        className={actualClassName}
        onClick={this.handleClick}
        onKeyUp={this.handleKeyUp}
        onKeyDown={this.handleKeyDown}
        tabIndex="0"
        role={ROLE_BUTTON}
        aria-owns={menuId}
        aria-haspopup="true"
      >
        {children}
      </div>
    );
  }
}

const MenuTrigger = React.forwardRef((props, ref) => <MenuTriggerRaw innerRef={ref} {...props} />);
MenuTrigger.displayName = 'MenuTrigger';

export default MenuTrigger;
