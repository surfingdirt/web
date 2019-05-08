/* eslint-disable jsx-a11y/role-supports-aria-props */

import LoginLogout from 'Components/LoginLogout';
import SVG from 'Components/SVG';
import Translate from 'Hocs/Translate';
import Dropdown from 'Images/dropdown.svg';
import Facebook from 'Images/facebook2.svg';
import Instagram from 'Images/instagram.svg';
import Search from 'Images/search.svg';
import Twitter from 'Images/twitter.svg';
import Logo from 'Images/logo.jpg';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';

import contexts from '~/contexts';
import routes from '~/routes';

import MenuBottomBar from './MenuBottomBar';
import messages from './messages';
import styles from './styles.scss';

const { AppContext } = contexts;
const { HOME, CLUBS, FIXTURES, PLAYERS, SEARCH, STANDINGS, STATS, VIDEOS } = routes;

const withRouterWorkaround = (Inner) => {
  const Wrapped = (props) => <Inner {...props} />;
  Wrapped.displayName = `WithRouterWorkaround(${Inner.displayName || Inner.name || '?'})`;
  return withRouter(Wrapped);
};

/* eslint-disable */
const MenuItem = ({ ariaLabel, children, tabIndex, to }) => (
  <li className={styles.link} role="none" tabIndex="0">
    <Link aria-label={ariaLabel} role="menuitem" tabIndex={tabIndex || 0} title={ariaLabel} to={to}>
      {children}
    </Link>
  </li>
);
/* eslint-enable */

// eslint-disable-next-line
const SocialLink = ({ href, icon }) => (
  <a href={href} rel="noopener noreferrer" target="_blank">
    <SVG icon={icon} hollow />
  </a>
);

const isUrlSearchPage = (url) => (url.indexOf(SEARCH) === 0);

// TODO: when we will get the final design of the navigation menu, check the following link =>
// https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html.
// If the navigation menu got submenu(s), the keyboard support will be useful.
class Menu extends PureComponent {
  static contextType = AppContext;

  static propTypes = {
    t: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    const { location } = this.props;
    const isSearchPage = isUrlSearchPage(location.pathname);
    const params = new URLSearchParams(location.search);

    this.state = {
      navigationExpanded: false,
      searchExpandedByUser: isSearchPage,
      isSearchPage,
      terms: params.get('terms') || '',
    };

    this.toggleNavigation = this.toggleNavigation.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onNavigation = this.onNavigation.bind(this);
    this.onTermsChange = this.onTermsChange.bind(this);

    this.searchInputRef = React.createRef();
  }

  componentDidMount() {
    const { history } = this.props;
    this.unlisten = history.listen(this.onNavigation);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  onTermsChange(e) {
    this.setState({ terms: e.target.value });
  }

  onNavigation({ pathname }) {
    const isSearchPage = isUrlSearchPage(pathname);
    const newState = { isSearchPage };
    if (!isSearchPage) {
      newState.searchExpandedByUser = false;
      newState.terms = '';
    }
    this.setState(newState);
  }

  toggleNavigation() {
    const {
      state: { navigationExpanded },
    } = this;

    this.setState({ navigationExpanded: !navigationExpanded });
  }

  toggleSearch() {
    const {
      state: { searchExpandedByUser, isSearchPage },
    } = this;

    if (!isSearchPage) {
      this.setState({ searchExpandedByUser: !searchExpandedByUser }, () => {
        if (this.state.searchExpandedByUser) {
          this.searchInputRef.current.focus();
        }
      });
    } else {
      this.searchInputRef.current.focus();
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const terms = this.searchInputRef.current.value;
    if (!terms.trim()) {
      return;
    }
    const searchUrl = `${SEARCH}/?terms=${terms}`;
    const { history } = this.props;
    history.push(searchUrl);
  }

  render() {
    const {
      context: {
        login: {
          data: { me },
        },
      },
      props: { t },
      state: { navigationExpanded, searchExpandedByUser, isSearchPage, terms },
    } = this;

    const searchExpanded = searchExpandedByUser || isSearchPage;

    return (
      <div className={styles.headerWrapper}>
        <div className={styles.headerContent}>
          <nav aria-label={t('navigationAriaLabel')} className={styles.desktopMenu}>
            <Link to={HOME}>
              <img alt={t('home')} className={styles.logo} src={Logo} />
            </Link>
            <ul aria-label={t('navigationAriaLabel')} className={styles.links} role="menubar">
              <MenuItem ariaLabel={t('videos')} to={VIDEOS}>
                {t('videos')}
              </MenuItem>
              <MenuItem ariaLabel={t('standings')} to={STANDINGS}>
                {t('standings')}
              </MenuItem>
              <MenuItem ariaLabel={t('fixturesResults')} to={FIXTURES}>
                {t('fixturesResults')}
              </MenuItem>
              <MenuItem ariaLabel={t('stats')} to={STATS}>
                {t('stats')}
              </MenuItem>
              <li className={styles.dropdownContainer} role="none">
                <button
                  aria-expanded={navigationExpanded}
                  aria-haspopup="true"
                  className={styles.dropdownButton}
                  onClick={this.toggleNavigation}
                  role="menuitem"
                  tabIndex="0"
                  type="button"
                >
                  <SVG icon={Dropdown} hollow />
                </button>
                {navigationExpanded && (
                  <ul
                    aria-label={t('navigationAriaLabel')}
                    className={styles.dropdownMenu}
                    role="menu"
                  >
                    <MenuItem ariaLabel={t('clubs')} to={CLUBS} tabIndex="-1">
                      {t('clubs')}
                    </MenuItem>
                    <MenuItem ariaLabel={t('players')} to={PLAYERS} tabIndex="-1">
                      {t('players')}
                    </MenuItem>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
          <div className={styles.right}>
            <div className={styles.iconsContainer}>
              <div className={styles.separator} />
            </div>
            <div className={styles.account}>
              <div className={styles.accountContent}>
                <LoginLogout user={me} />
              </div>
              <div className={styles.accountBg} />
            </div>
          </div>
        </div>
        <MenuBottomBar />
      </div>
    );
  }
}

export default Translate(messages)(withRouterWorkaround(Menu));
