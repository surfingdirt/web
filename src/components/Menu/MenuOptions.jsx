import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import MenuOption from './MenuOption';
import styles from './styles.scss';

class MenuOptions extends React.Component {
  static propTypes = {
    onSelectionMade: PropTypes.func.isRequired,
    horizontalPlacement: PropTypes.string,
    verticalPlacement: PropTypes.string,
  };

  static defaultProps = {
    horizontalPlacement: 'left',
    verticalPlacement: 'bottom',
  };

  constructor(props) {
    super(props);

    this.optionsRef = React.createRef();

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
    const optionNodes = this.optionsRef.current.querySelectorAll('.Menu__MenuOption');
    this.normalizeSelectedBy(delta, optionNodes.length);
    this.setState({ activeIndex: this.selectedIndex }, () => {
      optionNodes[this.selectedIndex].focus();
    });
  }

  renderOptions() {
    let index = 0;
    return React.Children.map(this.props.children, (c) => {
      let clonedOption = c;
      if (c.type === MenuOption) {
        const active = this.state.activeIndex === index;
        clonedOption = React.cloneElement(c, {
          active,
          index,
          _internalFocus: this.focusOption,
          _internalSelect: this.onSelectionMade,
        });
        index += 1;
      }
      return clonedOption;
    });
  }

  render() {
    const { horizontalPlacement, verticalPlacement } = this.props;

    const actualClassName = classnames(
      styles.menuOptions,
      styles[`menuOptionsHorizontal-${horizontalPlacement}`],
      styles[`menuOptionsVertical-${verticalPlacement}`],
    );

    return (
      <div
        id={this.context.id}
        ref={this.optionsRef}
        role="menu"
        tabIndex="-1"
        aria-expanded={this.context.active}
        style={{ visibility: this.context.active ? 'visible' : 'hidden' }}
        className={actualClassName}
        onKeyDown={this.handleKeys}
      >
        {this.renderOptions()}
      </div>
    );
  }
}

export default MenuOptions;
