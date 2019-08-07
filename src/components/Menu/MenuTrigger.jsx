import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class MenuTrigger extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onToggleActive: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  toggleActive() {
    this.props.onToggleActive(!this.context.active);
  }

  handleKeyUp(e) {
    if (e.key === ' ') {
      this.toggleActive();
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') this.toggleActive();
  }

  handleClick() {
    this.toggleActive();
  }

  render() {
    // TODO: generate active and id
    const active = false;
    const id = 123;


    const actualClassName = classnames(
      styles.menuTrigger,
      active ? styles.menuTriggerActive : styles.menuTriggerInactive,
    );

    return (
      <div
        className={actualClassName}
        onClick={this.handleClick}
        onKeyUp={this.handleKeyUp}
        onKeyDown={this.handleKeyDown}
        tabIndex="0"
        role="button"
        aria-owns={id}
        aria-haspopup="true"
      >
        {this.props.children}
      </div>
    );
  }
}

export default MenuTrigger;
