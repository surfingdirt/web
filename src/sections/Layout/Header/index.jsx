import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Logo, { logoTypes } from 'Components/Widgets/Logo/index';
import NamedNavigationItem from 'Components/Widgets/NamedNavigationItem/index';
import Profile from 'Components/Widgets/NavigationProfile/index';
import Translate from 'Hocs/Translate/index';
import icons, { getIcon, sizes } from 'Utils/icons';
import routes from '~/routes';

import messages from '../messages';

import styles from './styles.scss';

const { HOME } = routes;
const { STANDARD } = sizes;
const { HEADER_HORIZONTAL } = logoTypes;

const logo = (title) => (
  <Link to={HOME} className={styles.logo}>
    <Logo title={title} type={HEADER_HORIZONTAL} className={styles.logoTitle} />
  </Link>
);

const Header = ({ className, headerRef, t, title }) => (
  <header className={classnames(styles.header, className)} ref={headerRef}>
    <div className={styles.desktopHeader}>
      {logo(title)}
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
    </div>

    <div className={styles.mobileHeader}>{logo(title)}</div>
  </header>
);

Header.propTypes = {
  className: PropTypes.string,
  headerRef: PropTypes.shape({
    current: PropTypes.instanceOf(typeof Element === 'undefined' ? () => {} : Element),
  }).isRequired,
  t: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {
  className: null,
};

export default Translate(messages)(Header);
