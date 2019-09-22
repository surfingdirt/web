import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import icons, { getIcon, sizes } from 'Utils/icons';

import MenuOptions from './MenuOptions';
import MenuTrigger from './MenuTrigger';
import { keys, positions } from './constants';
import styles from './styles.scss';

const { DOWN, ESCAPE, ENTER, UP } = keys;
const { RIGHT, LEFT, TOP, BOTTOM } = positions;
const { STANDARD } = sizes;

class Menu extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    menuId: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          onSelect: PropTypes.func.isRequired,
        }).isRequired,
      ]),
    ).isRequired,
    preferredHorizontal: PropTypes.oneOf([LEFT, RIGHT]),
    preferredVertical: PropTypes.oneOf([TOP, BOTTOM]),
    trigger: PropTypes.node,
    triggerLabel: PropTypes.string,
  };

  static defaultProps = {
    className: null,
    preferredHorizontal: LEFT,
    preferredVertical: BOTTOM,
    trigger: null,
    triggerLabel: null,
  };

  constructor(props) {
    super(props);

    this.menuRef = React.createRef();
    this.triggerRef = React.createRef();
    this.optionsRef = React.createRef();
    this.optionItemRefs = props.options.map(() => React.createRef());
    this.mounted = false;

    const { preferredHorizontal, preferredVertical } = this.props;

    this.state = {
      active: false,
      activeOptionIndex: null,
      horizontalPlacement: preferredHorizontal,
      verticalPlacement: preferredVertical,
    };

    this.closeMenu = this.closeMenu.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeys = this.handleKeys.bind(this);
    this.handleTriggerToggle = this.handleTriggerToggle.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
  }

  closeMenu(cb) {
    if (cb) {
      this.setState({ active: false, activeOptionIndex: null }, cb);
    } else {
      this.setState({ active: false, activeOptionIndex: null });
    }
  }

  focusTrigger() {
    this.triggerRef.current.focus();
  }

  handleBlur() {
    // Give next element a tick to take focus
    setTimeout(() => {
      if (!this.mounted) {
        return;
      }
      if (!this.menuRef.current.contains(document.activeElement) && this.state.active) {
        this.closeMenu();
      }
    }, 0);
  }

  handleTriggerToggle() {
    const newActive = !this.state.active;
    this.setState({ active: newActive, activeOptionIndex: 0 }, this.afterTriggerToggle);
  }

  afterTriggerToggle() {
    const { active } = this.state;

    if (active) {
      this.updatePositioning();
    }
  }

  updatePositioning() {
    const { preferredHorizontal, preferredVertical } = this.props;

    const triggerRect = this.triggerRef.current.getBoundingClientRect();
    const optionsRect = this.optionsRef.current.getBoundingClientRect();

    let horizontalPlacement = preferredHorizontal;
    let verticalPlacement = preferredVertical;

    // Only update preferred placement positions if necessary to keep menu from
    // appearing off-screen.
    if (triggerRect.left + optionsRect.width > window.innerWidth) {
      horizontalPlacement = LEFT;
    } else if (optionsRect.left < 0) {
      horizontalPlacement = RIGHT;
    }
    if (triggerRect.bottom + optionsRect.height > window.innerHeight) {
      verticalPlacement = TOP;
    } else if (optionsRect.top < 0) {
      verticalPlacement = BOTTOM;
    }
    this.setState({
      horizontalPlacement,
      verticalPlacement,
    });
  }

  handleKeys(e) {
    let { activeOptionIndex } = this.state;
    const { options } = this.props;

    switch (e.key) {
      case ESCAPE:
        this.closeMenu(this.focusTrigger);
        break;
      case ENTER:
        {
          const currentOption = options[activeOptionIndex];
          if (currentOption.onSelect) {
            currentOption.onSelect();
          }
          this.closeMenu(this.focusTrigger);
        }
        break;
      case DOWN:
      case UP:
        activeOptionIndex += e.key === DOWN ? 1 : -1;
        if (activeOptionIndex > options.length - 1) {
          activeOptionIndex = 0;
        }
        if (activeOptionIndex < 0) {
          activeOptionIndex = options.length - 1;
        }
        this.optionItemRefs[activeOptionIndex].current.focus();
        this.setState({ activeOptionIndex });
        break;
      default:
        break;
    }
  }

  renderTrigger() {
    const { menuId, trigger, triggerLabel } = this.props;
    const { active: menuActive } = this.state;

    const attrs = {
      menuActive,
      menuId,
      onToggleActive: this.handleTriggerToggle,
      ref: this.triggerRef,
    };

    return (
      <MenuTrigger {...attrs}>
        {trigger ||
          getIcon({
            label: triggerLabel,
            type: icons.THREEDOTS_VERTICAL,
            size: STANDARD,
          })}
      </MenuTrigger>
    );
  }

  renderOptions() {
    const { menuId, options } = this.props;
    const { handleBlur, handleKeys } = this;

    const {
      active: menuActive,
      activeOptionIndex,
      horizontalPlacement,
      verticalPlacement,
    } = this.state;

    const attrs = {
      activeOptionIndex,
      horizontalPlacement,
      menuActive,
      menuId,
      handleBlur,
      handleKeys,
      onCloseRequested: this.closeMenu,
      optionItemRefs: this.optionItemRefs,
      options,
      ref: this.optionsRef,
      verticalPlacement,
    };

    return <MenuOptions {...attrs} />;
  }

  render() {
    const { className } = this.props;
    const { handleBlur, handleKeys } = this;

    return (
      <div
        className={classnames(styles.menu, className)}
        onBlur={handleBlur}
        onKeyDown={handleKeys}
        ref={this.menuRef}
      >
        {this.renderTrigger()}
        {this.renderOptions()}
      </div>
    );
  }
}

export default Menu;
