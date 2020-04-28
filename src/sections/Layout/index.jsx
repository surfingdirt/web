import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

import Translate from 'Hocs/Translate';
import MoreLinkNavigation from 'Sections/MoreLinkNavigation';
import ProfileLinkNavigation from 'Sections/ProfileLinkNavigation';
import icons from 'Utils/icons';
import { focusFirstFocusableItemInside } from 'Utils/misc';
import { NAVIGATION_PROFILE_MENU_LEFT, NAVIGATION_MORE_MENU } from '~/ids';
import AppContext from '~/contexts';
import routes from '~/routes';

import BottomBar from './BottomBar';
import Header from './Header';
import { MORE_NAVIGATION_ID, PROFILE_NAVIGATION_ID } from './constants';
import messages from './messages';
import styles from './styles.scss';

const { ALBUM_NEW, PHOTO_NEW, VIDEO_NEW } = routes;

const RESIZE = 'resize';

const BLUR_TIMEOUT = (1000 / 60) * 3;

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    t: PropTypes.func.isRequired,
  };

  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      actionButtonOrigin: [0, 0],
      bottomBarActionsOpen: false,
      hasActiveForm: false,
      moreNavigationMenuOpen: false,
      profileNavigationMenuOpen: false,
    };

    this.toggleActionButtons = this.toggleActionButtons.bind(this);
    this.openMoreNavigationMenu = this.openMoreNavigationMenu.bind(this);
    this.openProfileNavigationMenu = this.openProfileNavigationMenu.bind(this);
    this.closeMoreNavigationMenu = this.closeMoreNavigationMenu.bind(this);
    this.closeProfileNavigationMenu = this.closeProfileNavigationMenu.bind(this);
    this.closeAll = this.closeAll.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onNavigation = this.onNavigation.bind(this);

    this.actionButtonRef = React.createRef();
    this.bottomBarRef = React.createRef();
    this.headerRef = React.createRef();
    this.mainRef = React.createRef();
    this.moreNavigationMenuRef = React.createRef();
    this.profileNavigationMenuRef = React.createRef();
    this.actionLinkListRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener(RESIZE, this.onResize);
    this.onResize();

    const { history } = this.props;
    this.unlisten = history.listen(this.onNavigation);
  }

  componentWillUnmount() {
    window.removeEventListener(RESIZE, this.onResize);

    this.unlisten();
  }

  onNavigation() {
    this.closeAll();
  }

  onResize() {
    this.setState({
      actionButtonOrigin: this.getOrigin(),
      bottomBarActionsOpen: false,
      moreNavigationMenuOpen: false,
      profileNavigationMenuOpen: false,
    });
  }

  onBlur() {
    setTimeout(() => {
      if (!document.activeElement.closest('form')) {
        // Wait a bit before setting hasActiveForm because another focus might take place soon
        this.setState({ hasActiveForm: false });
      }
    }, BLUR_TIMEOUT);
  }

  onFocus(e) {
    this.setState({ hasActiveForm: !!e.target.closest('form') });
  }

  getOrigin() {
    const buttonEl = this.actionButtonRef.current;
    return [
      buttonEl.offsetLeft + buttonEl.offsetWidth,
      buttonEl.offsetTop - buttonEl.offsetHeight / 2,
    ];
  }

  toggleActionButtons() {
    const { bottomBarActionsOpen } = this.state;
    const newlyOpen = !bottomBarActionsOpen;
    this.setState({ bottomBarActionsOpen: newlyOpen });

    if (newlyOpen) {
      focusFirstFocusableItemInside(this.actionLinkListRef.current);
    }
  }

  openMoreNavigationMenu() {
    this.setState({ moreNavigationMenuOpen: true }, () => {
      // TODO: use a focus trap in the mobile navigation.
      focusFirstFocusableItemInside(this.moreNavigationMenuRef.current);
    });
  }

  openProfileNavigationMenu() {
    this.setState({ profileNavigationMenuOpen: true }, () => {
      // TODO: use a focus trap in the mobile navigation.
      focusFirstFocusableItemInside(this.profileNavigationMenuRef.current);
    });
  }

  closeMoreNavigationMenu() {
    this.setState({ moreNavigationMenuOpen: false });
  }

  closeProfileNavigationMenu() {
    this.setState({ profileNavigationMenuOpen: false });
  }

  closeAll() {
    // Uncheck the inputs used for JS-less menus which would cause the menu to remain open:
    document.getElementById(NAVIGATION_MORE_MENU).checked = false;
    document.getElementById(NAVIGATION_PROFILE_MENU_LEFT).checked = false;

    this.setState({
      bottomBarActionsOpen: false,
      moreNavigationMenuOpen: false,
      profileNavigationMenuOpen: false,
    });
  }

  render() {
    const {
      children,
      match: { url },
      t,
    } = this.props;

    const {
      actionButtonOrigin,
      bottomBarActionsOpen,
      hasActiveForm,
      moreNavigationMenuOpen,
      profileNavigationMenuOpen,
    } = this.state;

    const {
      login: {
        data: {
          me: { username },
        },
      },
      title,
    } = this.context;

    const loggedIn = !!username;

    const actionItems = [
      { to: ALBUM_NEW, icon: icons.ALBUM, label: t('addAnAlbum') },
      { to: PHOTO_NEW, icon: icons.PHOTO, label: t('addAPhoto') },
      { to: VIDEO_NEW, icon: icons.VIDEO, label: t('addAVideo') },
    ];

    const bottomBarProps = {
      actionButtonRef: this.actionButtonRef,
      actionLinkListRef: this.actionLinkListRef,
      actionButtonOrigin,
      actionItems,
      closeAll: this.closeAll,
      bottomBarActionsOpen,
      bottomBarRef: this.bottomBarRef,
      moreNavigationMenuOpen,
      profileNavigationMenuOpen,
      onPlusClick: this.toggleActionButtons,
      openMoreNavigationMenu: this.openMoreNavigationMenu,
      openProfileNavigationMenu: this.openProfileNavigationMenu,
      t,
      toggleActionButtons: this.toggleActionButtons,
    };

    return (
      <div
        className={classnames(styles.wrapper, {
          [styles.hasActiveForm]: hasActiveForm,
        })}
        onFocusCapture={this.onFocus}
        onBlurCapture={this.onBlur}
      >
        <Header className={styles.header} headerRef={this.headerRef} t={t} title={title} />

        <MoreLinkNavigation
          actionItems={actionItems}
          checkboxClassName={styles.navigationRightCheckbox}
          className={classnames(styles.navigation, styles.navigationRight)}
          currentUrl={url}
          id={MORE_NAVIGATION_ID}
          onCloseClick={this.closeMoreNavigationMenu}
          openClassName={styles.navigationOpen}
          openOnMobile={moreNavigationMenuOpen}
          ref={this.moreNavigationMenuRef}
        />

        <ProfileLinkNavigation
          checkboxClassName={styles.navigationLeftCheckbox}
          className={classnames(styles.navigation, styles.navigationLeft, styles.profileNavigation)}
          id={PROFILE_NAVIGATION_ID}
          currentUrl={url}
          onCloseClick={this.closeProfileNavigationMenu}
          openClassName={styles.navigationOpen}
          openOnMobile={profileNavigationMenuOpen}
          loggedIn={loggedIn}
          ref={this.profileNavigationMenuRef}
        />

        <main ref={this.mainRef} className={styles.main} aria-label={t('mainAriaLabel')}>
          {children}
        </main>

        <BottomBar {...bottomBarProps} />

        <div
          aria-hidden="true"
          className={classnames(styles.overlay, styles.navigationMenuOverlay, {
            [styles.overlayVisible]: moreNavigationMenuOpen || profileNavigationMenuOpen,
          })}
          onClick={this.closeAll}
        />
      </div>
    );
  }
}

export default withRouter(Translate(messages)(Layout));
