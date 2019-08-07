import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import MenuOptions from './MenuOptions';
import MenuTrigger from './MenuTrigger';

import uuid from './uuid';
import styles from './styles.scss';

class Menu extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    keepOpenOnSelect: PropTypes.bool,
    preferredHorizontal: PropTypes.oneOf(['left', 'right']),
    preferredVertical: PropTypes.oneOf(['top', 'bottom']),
  };

  static defaultProps = {
    className: null,
    preferredHorizontal: 'right',
    preferredVertical: 'bottom',
  };

  constructor(props) {
    super(props);

    this.menuRef = React.createRef();
    this.triggerRef = React.createRef();
    this.optionsRef = React.createRef();
    this.mounted = false;

    const { preferredHorizontal, preferredVertical } = this.props;

    this.state = {
      id: uuid(),
      active: false,
      selectedIndex: 0,
      horizontalPlacement: preferredHorizontal,
      verticalPlacement: preferredVertical,
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeys = this.handleKeys.bind(this);
    this.handleTriggerToggle = this.handleTriggerToggle.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
  }

  onSelectionMade() {
    if (!this.props.keepOpenOnSelect) {
      this.closeMenu(this.focusTrigger);
    }
  }

  closeMenu(cb) {
    if (cb) {
      this.setState({ active: false }, cb);
    } else {
      this.setState({ active: false });
    }
  }

  focusTrigger() {
    this.triggerRef.current.focus();
  }

  handleBlur(e) {
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
    this.setState({ active: !this.state.active }, this.afterTriggerToggle);
  }

  afterTriggerToggle() {
    const { active } = this.state;

    if (active) {
      // TODO: this propbably won't work
      this.optionsRef.current.focusOption(0);
      this.updatePositioning();
    }
  }

  updatePositioning() {
    const {
      preferredHorizontal: horizontalPlacement,
      preferredVertical: verticalPlacement,
    } = this.props;

    const triggerRect = this.triggerRef.current.getBoundingClientRect();
    const optionsRect = this.optionsRef.current.getBoundingClientRect();

    const positionState = { horizontalPlacement, verticalPlacement };
    // Only update preferred placement positions if necessary to keep menu from
    // appearing off-screen.
    if (triggerRect.left + optionsRect.width > window.innerWidth) {
      positionState.horizontalPlacement = 'left';
    } else if (optionsRect.left < 0) {
      positionState.horizontalPlacement = 'right';
    }
    if (triggerRect.bottom + optionsRect.height > window.innerHeight) {
      positionState.verticalPlacement = 'top';
    } else if (optionsRect.top < 0) {
      positionState.verticalPlacement = 'bottom';
    }
    this.setState(positionState);
  }

  handleKeys(e) {
    if (e.key === 'Escape') {
      this.closeMenu(this.focusTrigger);
    }
  }

  assertIsSane() {
    const { children } = this.props;

    const ok = React.Children.count(children) === 2;
    if (!ok) {
      throw new Error('Menu can only take two children: a MenuTrigger, and a MenuOptions');
    }
  }

  renderTrigger() {
    this.assertIsSane();

    const { children } = this.props;
    let trigger = null;

    React.Children.forEach(children, (child) => {
      if (child.type !== MenuTrigger) {
        return;
      }
      trigger = React.cloneElement(child, {
        ref: this.triggerRef,
        onToggleActive: this.handleTriggerToggle,
      });
    });
    return trigger;
  }

  renderMenuOptions() {
    this.assertIsSane();

    const { children } = this.props;
    let options = null;

    React.Children.forEach(children, (child) => {
      if (child.type !== MenuOptions) {
        return;
      }
      options = React.cloneElement(child, {
        ref: this.optionsRef,
        horizontalPlacement: this.state.horizontalPlacement,
        verticalPlacement: this.state.verticalPlacement,
        onSelectionMade: this.onSelectionMade,
      });
    });
    return options;
  }

  render() {
    const { className } = this.props;

    return (
      <div
        className={classnames(styles.menu, className)}
        onKeyDown={this.handleKeys}
        onBlur={this.handleBlur}
        ref={this.menuRef}
        role="menu"
        tabIndex="-1"
      >
        {this.renderTrigger()}
        {this.renderMenuOptions()}
      </div>
    );
  }
}

export default Menu;
