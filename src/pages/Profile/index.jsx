/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import Card from 'Components/Card';
import Translate from 'Hocs/Translate';
import { actionRoute } from 'Utils/links';
import actions from '~/actions';
import AppContext from '~/contexts';
import routes from '~/routes';

import messages from './messages';

const { LOGOUT } = actions;
const { HOME } = routes;

class ProfileRaw extends React.Component {
  static contextType = AppContext;

  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;
    const {
      login: {
        data: {
          me: { avatar, username },
        },
      },
    } = this.context;
    const isLoggedIn = !!username;

    if (!isLoggedIn) {
      return <Redirect to={HOME} />;
    }

    return (
      <Card title={username} type="main">
        {avatar ? (
          <p>
            <img src={avatar} alt={t('avatar')} />
          </p>
        ) : (
          <p>No avatar</p>
        )}
        <form action={actionRoute(LOGOUT)} method="POST" encType="multipart/form-data">
          <button type="submit">{t('logout')}</button>
        </form>
      </Card>
    );
  }
}

export const Profile = Translate(messages)(ProfileRaw);
