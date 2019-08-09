import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import MenuOption from './MenuOption';
import styles from './styles.scss';

class MenuOptionsRaw extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleKeys: PropTypes.func.isRequired,
    horizontalPlacement: PropTypes.string,
    innerRef: PropTypes.shape({
      current: PropTypes.instanceOf(typeof Element === 'undefined' ? () => {} : Element),
    }).isRequired,
    menuActive: PropTypes.bool.isRequired,
    menuId: PropTypes.string.isRequired,
    onCloseRequested: PropTypes.func.isRequired,
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

  renderOptions() {
    const { children, handleBlur, handleKeys, onCloseRequested } = this.props;
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
          handleBlur,
          handleKeys,
          onCloseRequested,
        });
        index += 1;
      }
      return clonedOption;
    });
  }

  render() {
    const {
      handleBlur,
      handleKeys,
      horizontalPlacement,
      innerRef,
      menuActive,
      menuId,
      verticalPlacement,
    } = this.props;

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
        onBlur={handleBlur}
        onKeyDown={handleKeys}
      >
        {this.renderOptions()}
      </div>
    );
  }
}

const MenuOptions = React.forwardRef((props, ref) => <MenuOptionsRaw innerRef={ref} {...props} />);
MenuOptions.displayName = 'MenuOptions';

export default MenuOptions;
