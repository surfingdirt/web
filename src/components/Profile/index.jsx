import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import NamedNavigationItem from 'Components/NamedNavigationItem';
import Translate from 'Hocs/Translate';
import icons, { getIcon } from 'Utils/icons';
import AppContext from '~/contexts';
import routes from '~/routes';

import messages from './messages';
import styles from './styles.scss';

const { PROFILE } = icons;
const { LOGIN, PROFILE: PROFILE_PAGE } = routes;

class Profile extends React.Component {
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
          me: { username },
        },
      },
    } = this.context;

    const loggedIn = !!username;

    const title = loggedIn ? username : t('login');
    const to = loggedIn ? PROFILE_PAGE : LOGIN;

    return (
      <Link to={to} className={classnames(className, styles.wrapper)}>
        <NamedNavigationItem
          label={title}
          visual={getIcon({ type: PROFILE, presentationOnly: true, standardIcon: true })}
        />
      </Link>
    );
  }
}

export default Translate(messages)(Profile);
