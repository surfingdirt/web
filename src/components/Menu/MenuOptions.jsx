import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import MenuOption from './MenuOption';
import { positions } from './constants';
import styles from './styles.scss';

const { BOTTOM, RIGHT } = positions;

class MenuOptionsRaw extends React.Component {
  static propTypes = {
    activeOptionIndex: PropTypes.number,
    handleBlur: PropTypes.func.isRequired,
    handleKeys: PropTypes.func.isRequired,
    horizontalPlacement: PropTypes.string,
    innerRef: PropTypes.shape({
      current: PropTypes.instanceOf(typeof Element === 'undefined' ? () => {} : Element),
    }).isRequired,
    menuActive: PropTypes.bool.isRequired,
    menuId: PropTypes.string.isRequired,
    onCloseRequested: PropTypes.func.isRequired,
    optionItemRefs: PropTypes.arrayOf(
      PropTypes.shape({
        current: PropTypes.instanceOf(typeof Element === 'undefined' ? () => {} : Element),
      }).isRequired,
    ).isRequired,
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          onSelect: PropTypes.func.isRequired,
        }).isRequired,
      ]),
    ).isRequired,
    verticalPlacement: PropTypes.string,
  };

  static defaultProps = {
    activeOptionIndex: null,
    horizontalPlacement: RIGHT,
    verticalPlacement: BOTTOM,
  };

  renderOptions() {
    const {
      activeOptionIndex,
      handleBlur,
      handleKeys,
      onCloseRequested,
      optionItemRefs,
      options,
    } = this.props;

    return options.map((option, index) => {
      const active = activeOptionIndex === index;
      const attrs = {
        active,
        index,
        handleBlur,
        handleKeys,
        onCloseRequested,
        ref: optionItemRefs[index],
      };

      let content;
      if (typeof option === 'function') {
        content = option();
      } else {
        const { label, onSelect } = option;
        content = label;
        attrs.onSelect = onSelect;
      }

      return (
        <MenuOption key={index} {...attrs}>
          {content}
        </MenuOption>
      );
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
