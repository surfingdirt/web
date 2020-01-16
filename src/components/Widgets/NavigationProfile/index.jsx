import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import UserProfile, { userProfileTypes } from 'Components/User/UserProfile';
import Menu from 'Components/Widgets/Menu';
import menuStyles from 'Components/Widgets/Menu/styles.scss';
import NamedNavigationItem from 'Components/Widgets/NamedNavigationItem';
import Translate from 'Hocs/Translate';
import icons, { getIcon, sizes } from 'Utils/icons';
import AppContext from '~/contexts';
import routes from '~/routes';

import messages from './messages';
import styles from './styles.scss';
import LogoutForm from 'Components/User/LogoutForm';

const { PROFILE } = icons;
const { LOGIN, PROFILE: PROFILE_PAGE, REGISTRATION, SETTINGS } = routes;
const { STANDARD } = sizes;

class NavigationProfile extends React.Component {
  static contextType = AppContext;

  static propTypes = {
    /* Common props */
    className: PropTypes.string,
    t: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: null,
  };

  render() {
    const { className, t } = this.props;

    const {
      login: {
        data: {
          me: { avatar, username },
        },
      },
    } = this.context;

    const loggedIn = !!username;

    const title = loggedIn ? username : t('login');
    const to = loggedIn ? PROFILE_PAGE : LOGIN;
    const hasAvatar = avatar && avatar.length > 0;

    const visual =
      loggedIn && hasAvatar ? (
        <UserProfile username={username} images={avatar} type={userProfileTypes.FILL} />
      ) : (
        getIcon({ type: PROFILE, presentationOnly: true, size: STANDARD })
      );

    let options;
    if (loggedIn) {
      options = [
        () => (
          <Link to={PROFILE_PAGE} className={menuStyles.menuEntry}>
            {t('profile')}
          </Link>
        ),
        () => (
          <Link to={SETTINGS} className={menuStyles.menuEntry}>
            {t('settings')}
          </Link>
        ),
        () => <LogoutForm buttonClassName={menuStyles.menuEntry} />,
      ];
    } else {
      options = [
        () => (
          <Link to={LOGIN} className={menuStyles.menuEntry}>
            {t('login')}
          </Link>
        ),
        () => (
          <Link to={REGISTRATION} className={menuStyles.menuEntry}>
            {t('register')}
          </Link>
        ),
      ];
    }

    const trigger = (
      <div className={styles.menuTrigger}>
        {getIcon({
          className: styles.arrow,
          presentationOnly: true,
          size: sizes.TINY,
          type: icons.ARROW_DOWN,
        })}
        <NamedNavigationItem label={title} visual={visual} />
      </div>
    );

    return (
      <Menu trigger={trigger} className={classnames(className, styles.wrapper)} options={options} />
    );
  }
}

export default Translate(messages)(NavigationProfile);
