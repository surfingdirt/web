import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router';

import Translate from 'Hocs/Translate';
import LogoutForm from 'Components/User/LogoutForm';
import menuStyles from 'Components/Widgets/Menu/styles.scss';
import NavigationLink from 'Components/Widgets/NavigationLink';
import icons, { getIcon } from 'Utils/icons';
import sizes from 'Utils/iconSizes';
import AppContext from '~/contexts';
import routes from '~/routes';
import { NAVIGATION_PROFILE_MENU_LEFT } from '~/ids';

import styles from './styles.scss';
import messages from './messages';

const { LOGIN, PROFILE, REGISTRATION, SETTINGS } = routes;
const { STANDARD } = sizes;

class ProfileLinkNavigationRaw extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    checkboxClassName: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    innerRef: PropTypes.shape({
      current: PropTypes.instanceOf(typeof Element === 'undefined' ? () => {} : Element),
    }).isRequired,
    loggedIn: PropTypes.bool.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    openClassName: PropTypes.string.isRequired,
    openOnMobile: PropTypes.bool.isRequired,
    currentUrl: PropTypes.string.isRequired,
  };

  static contextType = AppContext;

  render() {
    const {
      checkboxClassName,
      className,
      currentUrl,
      id,
      innerRef,
      loggedIn,
      onCloseClick,
      openClassName,
      openOnMobile,
      t,
    } = this.props;

    const { features } = this.context;
    const items = [];

    if (loggedIn) {
      items.push({ to: PROFILE, label: t('profile') }, { to: SETTINGS, label: t('settings') });
    } else {
      if (features.registration) {
        items.push({ to: REGISTRATION, label: t('register') });
      }
      items.push({ to: LOGIN, label: t('login') });
    }

    return (
      <Fragment>
        <input
          type="checkbox"
          id={NAVIGATION_PROFILE_MENU_LEFT}
          className={checkboxClassName}
          hidden
        />
        <nav
          className={classnames(styles.wrapper, className, { [openClassName]: openOnMobile })}
          aria-label={t('linkNav')}
        >
          <div className={styles.positioner} role="menu" id={id} ref={innerRef}>
            <ul className={styles.linkList} role="none">
              {items.map((props) => (
                <li key={props.to} role="none">
                  <NavigationLink {...props} active={props.to === currentUrl} role="menuitem" />
                </li>
              ))}
              {loggedIn && (
                <li role="none">
                  <LogoutForm buttonClassName={menuStyles.menuEntry} renderAsNavigationLink />
                </li>
              )}
            </ul>
            {/* eslint-disable-next-line jsx-a11y/label-has-for */}
            <label
              className={styles.closeBtn}
              role="button"
              onClick={onCloseClick}
              htmlFor={NAVIGATION_PROFILE_MENU_LEFT}
            >
              {getIcon({ type: icons.CLOSE, size: STANDARD, label: t('close') })}
            </label>
          </div>
        </nav>
      </Fragment>
    );
  }
}
const TranslatedProfileLinkNavigation = Translate(messages)(withRouter(ProfileLinkNavigationRaw));
const ProfileLinkNavigation = React.forwardRef((props, ref) => (
  <TranslatedProfileLinkNavigation innerRef={ref} {...props} />
));
ProfileLinkNavigation.displayName = 'LinkNavigation';
export default ProfileLinkNavigation;
