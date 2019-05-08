import SVG from 'Components/SVG';
import Translate from 'Hocs/Translate';
import Competitions from 'Images/competitions.svg';
import Home from 'Images/home.svg';
import More from 'Images/more.svg';
import Stats from 'Images/stats.svg';
import Videos from 'Images/video.svg';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import routes from '~/routes';

import { CompetitionsMenu, MoreMenu, StatsMenu, VideosMenu } from '../MenuModals';
import messages from '../messages';
import styles from '../styles.scss';

const { HOME } = routes;

const HOMEPAGE = 'home';
const COMPETITIONS = 'competitions';
const VIDEOS = 'videos';
const STATS = 'stats';
const MORE = 'more';

const togglePageClass = (enabled) => {
  document.querySelector('html').classList.toggle(styles.noScroll, enabled);
};

class MenuBottomBar extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    const {
      location: { pathname },
    } = props;

    this.state = {
      currentMenuEntry: pathname === HOME ? HOMEPAGE : null,
    };

    this.onMenuClick = this.onMenuClick.bind(this);
    this.onNavigation = this.onNavigation.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    this.unlisten = history.listen(this.onNavigation);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  onNavigation({ pathname }) {
    this.setState({
      currentMenuEntry: pathname === HOME ? HOMEPAGE : null,
    });
  }

  onMenuClick(e) {
    if (!e) {
      this.setState({
        currentMenuEntry: null,
      });
      togglePageClass(false);
      return;
    }

    const targetName = e.currentTarget.dataset.name;
    if (!targetName) {
      return;
    }
    this.setState({
      currentMenuEntry: targetName,
    });
    togglePageClass(targetName === HOMEPAGE);
  }

  render() {
    const {
      props: { t },
      state: { currentMenuEntry },
    } = this;
    return (
      <Fragment>
        {currentMenuEntry === COMPETITIONS && <CompetitionsMenu onClick={this.onMenuClick} />}
        {currentMenuEntry === VIDEOS && <VideosMenu onClick={this.onMenuClick} />}
        {currentMenuEntry === STATS && <StatsMenu onClick={this.onMenuClick} />}
        {currentMenuEntry === MORE && <MoreMenu onClick={this.onMenuClick} />}
        <div className={styles.menuBottomBar}>
          <nav className={styles.responsiveMenu}>
            <ul aria-label={t('navigationAriaLabel')} className={styles.links} role="menubar">
              <li
                className={currentMenuEntry === HOMEPAGE ? styles.active : ''}
                data-name={HOMEPAGE}
                onClick={(e) => {
                  this.onMenuClick(e);
                }}
                role="none"
              >
                <Link to={HOME}>
                  <SVG icon={Home} hollow />
                  <span>{t('home')}</span>
                </Link>
              </li>
              <li
                role="none"
                className={currentMenuEntry === COMPETITIONS ? styles.active : ''}
                data-name={COMPETITIONS}
                onClick={(e) => {
                  this.onMenuClick(e);
                }}
              >
                <SVG icon={Competitions} hollow />
                <span>{t('competitions')}</span>
              </li>
              <li
                className={currentMenuEntry === VIDEOS ? styles.active : ''}
                data-name={VIDEOS}
                onClick={(e) => {
                  this.onMenuClick(e);
                }}
                role="none"
              >
                <SVG icon={Videos} hollow />
                <span>{t('videos')}</span>
              </li>
              <li
                className={currentMenuEntry === STATS ? styles.active : ''}
                data-name={STATS}
                onClick={(e) => {
                  this.onMenuClick(e);
                }}
                role="none"
              >
                <SVG icon={Stats} />
                <span>{t('stats')}</span>
              </li>
              <li
                className={currentMenuEntry === MORE ? styles.active : ''}
                data-name={MORE}
                onClick={(e) => {
                  this.onMenuClick(e);
                }}
                role="none"
              >
                <SVG icon={More} hollow />
                <span>{t('more')}</span>
              </li>
            </ul>
          </nav>
        </div>
      </Fragment>
    );
  }
}

export default Translate(messages)(withRouter(MenuBottomBar));
