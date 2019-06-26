import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import BottomBarActionButton from 'Components/BottomBarActionButton';
import Logo from 'Components/Logo';
import Profile from 'Components/Profile';
import SVG from 'Components/SVG';
import Translate from 'Hocs/Translate';
import BottomBar from 'Images/bottom-bar.svg';
import Search from 'Images/search-circle.svg';
import ThreeDots from 'Images/navigation-menu-horizontal.svg';
import Actions from 'Sections/Actions';
import BottomBarActions from 'Sections/BottomBarActions';
import Footer from 'Sections/Footer';
import Main from 'Sections/Main';
import Navigation from 'Sections/Navigation';
import icons, { getIcon } from 'Utils/icons';
import contexts from '~/contexts';
import routes from '~/routes';

import messages from './messages';
import styles from './styles.scss';

const { ALBUM_NEW, HOME, PHOTO_NEW, VIDEO_NEW } = routes;
const { AppContext } = contexts;

const RESIZE = 'resize';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = { bottomBarActionsOpen: false, actionButtonOrigin: [0, 0] };

    this.onActionButtonClick = this.onActionButtonClick.bind(this);
    this.closeActionButtons = this.closeActionButtons.bind(this);
    this.onResize = this.onResize.bind(this);

    this.actionButtonRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener(RESIZE, this.onResize);
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener(RESIZE, this.onResize);
  }

  onResize() {
    this.setState({
      actionButtonOrigin: this.getOrigin(),
    });
  }

  onActionButtonClick() {
    const { bottomBarActionsOpen } = this.state;
    this.setState({ bottomBarActionsOpen: !bottomBarActionsOpen });
  }

  getOrigin() {
    const buttonEl = this.actionButtonRef.current;
    return [
      buttonEl.offsetLeft + buttonEl.offsetWidth,
      buttonEl.offsetTop - buttonEl.offsetHeight / 2,
    ];
  }

  closeActionButtons() {
    this.setState({ bottomBarActionsOpen: false });
  }

  render() {
    const {
      children,
      match: { url },
      t,
    } = this.props;

    const { bottomBarActionsOpen, actionButtonOrigin } = this.state;

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
            <SVG icon={Search} label={t('search')} standardIcon />
          </div>
          <div className={styles.activity}>{t('activity')}</div>
          <Profile className={styles.profile} to="toto" name="Mikael" />
        </header>

        <Navigation className={styles.navigation} url={url} />
        <Footer className={styles.footer} />
        <Actions className={styles.actions} items={actionItems} />
        <Main className={styles.main}>{children}</Main>

        <nav className={styles.bottomBar}>
          <button type="button" className={styles.more}>
            <SVG icon={ThreeDots} hollow label={t('more')} className={styles.moreIcon} standardIcon />
          </button>
          <div className={styles.actionButtonWrapper} ref={this.actionButtonWrapperRef}>
            <BottomBarActionButton
              ref={this.actionButtonRef}
              className={styles.actionButton}
              icon={getIcon(
                icons.CLOSE,
                t('actionButton'),
                classnames(styles.closeIcon, { [styles.closeIconActive]: bottomBarActionsOpen }),
              )}
              onClick={this.onActionButtonClick}
              active={bottomBarActionsOpen}
            />
            <BottomBarActions
              className={classnames(styles.bottomBarActionContainer, {
                [styles.bottomBarActionContainerVisible]: bottomBarActionsOpen,
              })}
              origin={actionButtonOrigin}
              items={actionItems}
              open={bottomBarActionsOpen}
              onCloseRequest={this.closeActionButtons}
            />

            <div className={styles.bottomBarBackground}>
              <SVG icon={BottomBar} hollow presentationOnly />
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Translate(messages)(Layout));
