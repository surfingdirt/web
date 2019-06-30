import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { Link } from 'react-router-dom';

import Button from 'Components/Button/index';
import SVG from 'Components/SVG';
import Translate from 'Hocs/Translate';

import AppContext from '~/contexts';
import routes from '~/routes';
import translations from './messages';

import styles from './styles.scss';

const { HOME, SIGN_IN } = routes;

class LoginLogout extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string,
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  };

  // noinspection JSUnusedGlobalSymbols
  static contextType = AppContext;

  render() {
    const { t, user } = this.props;
    const { login: loginObj } = this.context;

    if (user.id) {
      return (
        <Fragment>
          <span className={styles.username}>{`[${user.username}]`}</span>{' '}
          <Button
            buttonType="button"
            onClick={() => {
              loginObj.logout();
              window.location.href = HOME;
            }}
            label={t('signOut')}
          />
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Link to={SIGN_IN}>
          {t('signIn')}
        </Link>
      </Fragment>
    );
  }
}

export default Translate(translations)(LoginLogout);
