import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import PopupActionButton from 'Components/PopupActionButton';
import Logo, { logoTypes } from 'Components/Logo';
import NamedNavigationItem from 'Components/NamedNavigationItem';
import Profile from 'Components/NavigationProfile/index';
import SVG from 'Components/SVG';
import Translate from 'Hocs/Translate';
import BottomBarBackground from 'Images/bottom-bar.svg';
import Actions from 'Sections/Actions';
import BottomBarActions from 'Sections/BottomBarActions';
import LinkNavigation from 'Sections/LinkNavigation';
import icons, { getIcon, sizes } from 'Utils/icons';
import { focusFirstFocusableItemInside } from 'Utils/misc';
import AppContext from '~/contexts';
import routes from '~/routes';

import messages from './messages';
import styles from './styles.scss';

const { ALBUM_NEW, HOME, PHOTO_NEW, VIDEO_NEW } = routes;
const { STANDARD } = sizes;
const { HEADER_HORIZONTAL } = logoTypes;

const RESIZE = 'resize';
const SCROLL = 'scroll';

const SCROLL_THRESHOLD = 60;
const DOWN = 1;
const UP = 0;

const NAVIGATION_ID = 'link-navigation-items';
const ACTION_ITEMS_ID = 'action-items';

const Header = ({ headerRef, t, title }) => (
  <header className={styles.header} ref={headerRef}>
    <div className={styles.headerBackground} />
    <Link to={HOME} className={styles.logo}>
      <Logo title={title} type={HEADER_HORIZONTAL} />
    </Link>
    <div className={styles.search}>
      {getIcon({ type: icons.SEARCH, label: t('search'), size: STANDARD })}
    </div>
    <div className={styles.activity}>
      <NamedNavigationItem
        label={t('activity')}
        visual={getIcon({ type: icons.ACTIVITY, size: STANDARD, presentationOnly: true })}
      />
    </div>
    <Profile className={styles.profile} />
  </header>
);
Header.propTypes = {
  headerRef: PropTypes.shape({
    current: PropTypes.instanceOf(typeof Element === 'undefined' ? () => {} : Element),
  }).isRequired,
  t: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const BottomBar = ({
  actionButtonRef,
  actionButtonOrigin,
  actionLinkListRef,
  actionItems,
  bottomBarActionsOpen,
  bottomBarRef,
  closeAll,
  navigationMenuOpen,
  onPlusClick,
  openNavigationMenu,
  t,
}) => (
  <nav className={styles.bottomBar} aria-label={t('actionNav')} ref={bottomBarRef}>
    <div
      aria-hidden="true"
      className={classnames(styles.overlay, styles.actionButtonOverlay, {
        [styles.overlayVisible]: bottomBarActionsOpen,
      })}
      onClick={closeAll}
    />

    <button
      type="button"
      className={styles.more}
      aria-haspopup="true"
      aria-expanded={navigationMenuOpen}
      aria-controls={NAVIGATION_ID}
      onClick={openNavigationMenu}
    >
      <NamedNavigationItem
        label={t('more')}
        visual={getIcon({
          type: icons.THREEDOTS_HORIZONTAL,
          presentationOnly: true,
          size: STANDARD,
        })}
      />
    </button>

    <div className={styles.plusButtonWrapper}>
      <button
        type="button"
        className={styles.plusButtonOffset}
        onClick={onPlusClick}
        aria-haspopup="true"
        aria-expanded={bottomBarActionsOpen}
        aria-controls={ACTION_ITEMS_ID}
      >
        <PopupActionButton
          ref={actionButtonRef}
          className={styles.plusButton}
          active={bottomBarActionsOpen}
        >
          {getIcon({
            type: icons.CLOSE,
            label: t('actionButton'),
            className: classnames(styles.closeIcon, {
              [styles.closeIconActive]: bottomBarActionsOpen,
            }),
          })}
        </PopupActionButton>

        <BottomBarActions
          className={classnames(styles.bottomBarActionContainer, {
            [styles.bottomBarActionContainerVisible]: bottomBarActionsOpen,
          })}
          id={ACTION_ITEMS_ID}
          items={actionItems}
          open={bottomBarActionsOpen}
          origin={actionButtonOrigin}
          ref={actionLinkListRef}
        />
      </button>
      <NamedNavigationItem
        aria-hidden="true"
        className={styles.plusLabel}
        label={t('actionButton')}
        visual={<div className={styles.plusPlaceholder} />}
      />
    </div>
    <div className={styles.bottomBarBackground}>
      <SVG icon={BottomBarBackground} hollow presentationOnly />
    </div>
  </nav>
);
BottomBar.propTypes = {
  actionButtonRef: PropTypes.shape({
    current: PropTypes.instanceOf(typeof Element === 'undefined' ? () => {} : Element),
  }).isRequired,
  actionLinkListRef: PropTypes.shape({
    current: PropTypes.instanceOf(typeof Element === 'undefined' ? () => {} : Element),
  }).isRequired,
  actionButtonOrigin: PropTypes.arrayOf(PropTypes.number).isRequired,
  actionItems: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  bottomBarRef: PropTypes.shape({
    current: PropTypes.instanceOf(typeof Element === 'undefined' ? () => {} : Element),
  }).isRequired,
  bottomBarActionsOpen: PropTypes.bool.isRequired,
  closeAll: PropTypes.func.isRequired,
  navigationMenuOpen: PropTypes.bool.isRequired,
  onPlusClick: PropTypes.func.isRequired,
  openNavigationMenu: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

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
      bottomBarActionsOpen: false,
      navigationMenuOpen: false,
      actionButtonOrigin: [0, 0],
    };

    this.currentScrollTop = 0;

    this.toggleActionButtons = this.toggleActionButtons.bind(this);
    this.openNavigationMenu = this.openNavigationMenu.bind(this);
    this.closeNavigationMenu = this.closeNavigationMenu.bind(this);
    this.closeAll = this.closeAll.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onNavigation = this.onNavigation.bind(this);

    this.actionButtonRef = React.createRef();
    this.bottomBarRef = React.createRef();
    this.headerRef = React.createRef();
    this.mainRef = React.createRef();
    this.navigationMenuRef = React.createRef();
    this.actionLinkListRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener(RESIZE, this.onResize);
    this.onResize();

    this.mainRef.current.addEventListener(SCROLL, this.onScroll, { passive: true });
    this.onScroll();

    const { history } = this.props;
    this.unlisten = history.listen(this.onNavigation);
  }

  componentWillUnmount() {
    window.removeEventListener(RESIZE, this.onResize);

    this.mainRef.current.removeEventListener(SCROLL, this.onScroll);

    this.unlisten();
  }

  onNavigation() {
    this.closeAll();
  }

  onResize() {
    this.setState({
      actionButtonOrigin: this.getOrigin(),
      bottomBarActionsOpen: false,
      navigationMenuOpen: false,
    });
  }

  onScroll() {
    const {
      mainRef: {
        current: { scrollTop },
      },
      headerRef: { current: headerEl },
      bottomBarRef: { current: bottomBarEl },
    } = this;

    const direction = scrollTop > this.currentScrollTop ? DOWN : UP;
    let hideNav;
    if (direction === UP) {
      hideNav = false;
    } else {
      if (scrollTop > SCROLL_THRESHOLD) {
        hideNav = true;
      } else {
        hideNav = false;
      }
    }

    // Skip the whole React state thing because this is a performance-sensitive animation:
    headerEl.classList.toggle(styles.hideNav, hideNav);
    bottomBarEl.classList.toggle(styles.hideNav, hideNav);

    this.currentScrollTop = scrollTop;
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

  openNavigationMenu() {
    this.setState({ navigationMenuOpen: true }, () => {
      // TODO: use a focus trap in the mobile navigation.
      focusFirstFocusableItemInside(this.navigationMenuRef.current);
    });
  }

  closeNavigationMenu() {
    this.setState({ navigationMenuOpen: false });
  }

  closeAll() {
    this.setState({ bottomBarActionsOpen: false, navigationMenuOpen: false });
  }

  render() {
    const {
      children,
      match: { url },
      t,
    } = this.props;

    const { bottomBarActionsOpen, navigationMenuOpen, actionButtonOrigin } = this.state;

    const { title } = this.context;

    const actionItems = [
      { to: ALBUM_NEW, icon: icons.ALBUM, label: t('createAnAlbum') },
      { to: PHOTO_NEW, icon: icons.PHOTO, label: t('postAPhoto') },
      { to: VIDEO_NEW, icon: icons.VIDEO, label: t('postAVideo') },
    ];

    const bottomBarProps = {
      actionButtonRef: this.actionButtonRef,
      actionLinkListRef: this.actionLinkListRef,
      actionButtonOrigin,
      actionItems,
      closeAll: this.closeAll,
      bottomBarActionsOpen,
      bottomBarRef: this.bottomBarRef,
      navigationMenuOpen,
      onPlusClick: this.toggleActionButtons,
      openNavigationMenu: this.openNavigationMenu,
      t,
      toggleActionButtons: this.toggleActionButtons,
    };

    return (
      <div className={styles.wrapper}>
        <Header headerRef={this.headerRef} t={t} title={title} />

        <LinkNavigation
          className={styles.navigation}
          id={NAVIGATION_ID}
          currentUrl={url}
          onCloseClick={this.closeNavigationMenu}
          openOnMobile={navigationMenuOpen}
          ref={this.navigationMenuRef}
        />

        <Actions className={styles.actions} items={actionItems} label={t('actionNav')} />

        <main ref={this.mainRef} className={styles.main}>
          {children}
        </main>

        <BottomBar {...bottomBarProps} />

        <div
          aria-hidden="true"
          className={classnames(styles.overlay, styles.navigationMenuOverlay, {
            [styles.overlayVisible]: navigationMenuOpen,
          })}
          onClick={this.closeAll}
        />
      </div>
    );
  }
}

export default withRouter(Translate(messages)(Layout));
