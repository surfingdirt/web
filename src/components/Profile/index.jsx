import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import NamedNavigationItem from 'Components/NamedNavigationItem';
import icons, { getIcon } from 'Utils/icons';
import AppContext from '~/contexts';

import styles from './styles.scss';

const { PROFILE } = icons;

class Profile extends React.Component {
  static contextType = AppContext;

  static propTypes = {
    /* Common props */
    className: PropTypes.string,
    to: PropTypes.string.isRequired,
  };

  static defaultProps = {
    className: null,
  };

  render() {
    const { className, to } = this.props;

    let {
      login: {
        data: {
          me: { username },
        },
      },
    } = this.context;

    username = username || 'login!';

    return (
      <Link to={to} className={classnames(className, styles.wrapper)}>
        <NamedNavigationItem
          label={username}
          visual={getIcon({ type: PROFILE, presentationOnly: true, standardIcon: true })}
        />
      </Link>
    );
  }
}

export default Profile;
