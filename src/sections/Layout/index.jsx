import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import PopupActionButton from 'Components/PopupActionButton';
import Logo from 'Components/Logo';
import NamedNavigationItem from 'Components/NamedNavigationItem';
import Profile from 'Components/Profile/index';
import SVG from 'Components/SVG';
import Translate from 'Hocs/Translate';
import BottomBar from 'Images/bottom-bar.svg';
import Actions from 'Sections/Actions';
import BottomBarActions from 'Sections/BottomBarActions';
import Footer from 'Sections/Footer';
import Main from 'Sections/Main';
import Navigation from 'Sections/Navigation';
import icons, { getIcon, sizes } from 'Utils/icons';
import AppContext from '~/contexts';
import routes from '~/routes';

import messages from './messages';
import styles from './styles.scss';

const { ALBUM_NEW, HOME, PHOTO_NEW, VIDEO_NEW } = routes;
const { STANDARD } = sizes;

const RESIZE = 'resize';

const NAVIGATION_ID = '123';

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

    this.toggleActionButtons = this.toggleActionButtons.bind(this);
    this.openNavigationMenu = this.openNavigationMenu.bind(this);

    this.closeNavigationMenu = this.closeNavigationMenu.bind(this);

    this.closeAll = this.closeAll.bind(this);

    this.onResize = this.onResize.bind(this);
    this.onNavigation = this.onNavigation.bind(this);

    this.actionButtonRef = React.createRef();
    this.navigationMenuRef = React.createRef();
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
    });
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
    this.setState({ bottomBarActionsOpen: !bottomBarActionsOpen });
  }

  openNavigationMenu() {
    this.setState({ navigationMenuOpen: true }, () => {
      // Find the first focusable item. Stick to links for now.
      // TODO: use a focus trap in the mobile navigation.
      const links = this.navigationMenuRef.current.getElementsByTagName('a');
      if (links && links.length >= 1) {
        links[0].focus();
      }
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

    return (
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className={styles.headerBackground} />
          <Link to={HOME} className={styles.logo}>
            <Logo title={title} />
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

        <Navigation
          className={styles.navigation}
          id={NAVIGATION_ID}
          currentUrl={url}
          onCloseClick={this.closeNavigationMenu}
          openOnMobile={navigationMenuOpen}
          ref={this.navigationMenuRef}
        />
        <Footer className={styles.footer} />
        <Actions className={styles.actions} items={actionItems} />
        <Main className={styles.main}>{children}</Main>

        <nav className={styles.bottomBar} aria-label={t('actionNav')}>
          <div
            aria-hidden="true"
            className={classnames(styles.overlay, styles.actionButtonOverlay, {
              [styles.overlayVisible]: bottomBarActionsOpen,
            })}
            onClick={this.closeAll}
          />

          <button
            type="button"
            className={styles.more}
            aria-haspopup="true"
            aria-expanded={navigationMenuOpen}
            aria-controls={NAVIGATION_ID}
            onClick={this.openNavigationMenu}
          >
            <NamedNavigationItem
              label={t('more')}
              visual={getIcon({
                type: icons.THREEDOTS,
                presentationOnly: true,
                size: STANDARD,
              })}
            />
          </button>

          <div className={styles.plusButtonWrapper}>
            <button
              type="button"
              className={styles.plusButtonOffset}
              onClick={this.toggleActionButtons}
            >
              <PopupActionButton
                ref={this.actionButtonRef}
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
                origin={actionButtonOrigin}
                items={actionItems}
                open={bottomBarActionsOpen}
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
            <SVG icon={BottomBar} hollow presentationOnly />
          </div>
        </nav>

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
