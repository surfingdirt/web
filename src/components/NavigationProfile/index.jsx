import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import NamedNavigationItem from 'Components/NamedNavigationItem';
import Translate from 'Hocs/Translate';
import icons, { getIcon, sizes } from 'Utils/icons';
import AppContext from '~/contexts';
import routes from '~/routes';

import messages from './messages';
import styles from './styles.scss';
import UserProfile, { userProfileTypes } from 'Components/User/UserProfile';

const { PROFILE } = icons;
const { LOGIN, PROFILE: PROFILE_PAGE } = routes;
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

    return (
      <Link to={to} className={classnames(className, styles.wrapper)}>
        <NamedNavigationItem label={title} visual={visual} />
      </Link>
    );
  }
}

export default Translate(messages)(NavigationProfile);
