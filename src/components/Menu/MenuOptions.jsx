import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import MenuOption from './MenuOption';
import styles from './styles.scss';

class MenuOptionsRaw extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    innerRef: PropTypes.shape({
      current: PropTypes.instanceOf(typeof Element === 'undefined' ? () => {} : Element),
    }).isRequired,
    horizontalPlacement: PropTypes.string,
    menuActive: PropTypes.bool.isRequired,
    menuId: PropTypes.string.isRequired,
    onSelectionMade: PropTypes.func.isRequired,
    verticalPlacement: PropTypes.string,
  };

  static defaultProps = {
    horizontalPlacement: 'right',
    verticalPlacement: 'bottom',
  };

  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };
  }

  onSelectionMade() {
    this.props.onSelectionMade();
  }

  moveSelectionUp() {
    this.updateFocusIndexBy(-1);
  }

  moveSelectionDown() {
    this.updateFocusIndexBy(1);
  }

  handleKeys(e) {
    const options = {
      ArrowDown: this.moveSelectionDown,
      ArrowUp: this.moveSelectionUp,
      Escape: this.closeMenu,
    };
    if (options[e.key]) {
      options[e.key].call(this);
    }
  }

  normalizeSelectedBy(delta, numOptions) {
    this.selectedIndex += delta;
    if (this.selectedIndex > numOptions - 1) {
      this.selectedIndex = 0;
    } else if (this.selectedIndex < 0) {
      this.selectedIndex = numOptions - 1;
    }
  }

  focusOption(index) {
    this.selectedIndex = index;
    this.updateFocusIndexBy(0);
  }

  updateFocusIndexBy(delta) {
    const { innerRef } = this.props;
    const optionNodes = innerRef.current.querySelectorAll('.Menu__MenuOption');
    this.normalizeSelectedBy(delta, optionNodes.length);
    this.setState({ activeIndex: this.selectedIndex }, () => {
      optionNodes[this.selectedIndex].focus();
    });
  }

  renderOptions() {
    const { children } = this.props;
    const { activeIndex } = this.state;
    let index = 0;
    return React.Children.map(children, (c) => {
      let clonedOption = c;
      if (c.type === MenuOption) {
        const active = activeIndex === index;
        clonedOption = React.cloneElement(c, {
          active,
          key: index,
          index,
          internalFocus: this.focusOption,
          internalSelect: this.onSelectionMade,
        });
        index += 1;
      }
      return clonedOption;
    });
  }

  render() {
    const { horizontalPlacement, innerRef, menuActive, menuId, verticalPlacement } = this.props;

    const actualClassName = classnames(
      styles.menuOptions,
      styles[`menuOptionsHorizontal-${horizontalPlacement}`],
      styles[`menuOptionsVertical-${verticalPlacement}`],
    );

    return (
      <div
        id={menuId}
        ref={innerRef}
        role="menu"
        tabIndex="-1"
        aria-expanded={menuActive}
        style={{ visibility: menuActive ? 'visible' : 'hidden' }}
        className={actualClassName}
        onKeyDown={this.handleKeys}
      >
        {this.renderOptions()}
      </div>
    );
  }
}

const MenuOptions = React.forwardRef((props, ref) => <MenuOptionsRaw innerRef={ref} {...props} />);
MenuOptions.displayName = 'MenuOptions';

export default MenuOptions;
