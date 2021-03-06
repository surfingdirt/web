import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Logo, { logoTypes } from 'Components/Widgets/Logo';
import NamedNavigationItem from 'Components/Widgets/NamedNavigationItem';
import NavigationProfile from 'Components/Widgets/NavigationProfile';
import Translate from 'Hocs/Translate';
import icons, { getIcon } from 'Utils/icons';
import sizes from 'Utils/iconSizes';
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
  <header
    className={classnames(styles.header, className)}
    ref={headerRef}
    aria-label={t('headerAriaLabel')}
  >
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
      <NavigationProfile className={styles.profile} renderAsDropdown />
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
