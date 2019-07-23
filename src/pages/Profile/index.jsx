/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import Cover from 'Components/Cover';
import Card, { cardTypes } from 'Components/Card';
import Heading, { headingTypes } from 'Components/Heading';
import Translate from 'Hocs/Translate';
import { actionRoute } from 'Utils/links';
import actions from '~/actions';
import AppContext from '~/contexts';
import routes from '~/routes';

import messages from './messages';
import styles from './styles.scss';

const { LOGOUT } = actions;
const { HOME } = routes;

const { BARE } = cardTypes;
const { PRIMARY } = headingTypes;

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
          me: { avatar, cover, username },
        },
      },
    } = this.context;

    const isLoggedIn = !!username;
    if (!isLoggedIn) {
      return <Redirect to={HOME} />;
    }

    return (
      <Card type={BARE}>
        <Cover cover={cover} avatar={avatar} withUpdateForms />
        <div className={styles.contentWrapper}>
          <Heading className={styles.username} type={PRIMARY}>
            {username}
          </Heading>

          <form action={actionRoute(LOGOUT)} method="POST" encType="multipart/form-data">
            <button type="submit">{t('logout')}</button>
          </form>
        </div>
      </Card>
    );
  }
}

export const Profile = Translate(messages)(ProfileRaw);
