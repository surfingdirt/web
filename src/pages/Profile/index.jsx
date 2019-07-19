/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import Card, { cardTypes } from 'Components/Card';
import UserProfile, { userProfileTypes } from 'Components/UserProfile';
import Translate from 'Hocs/Translate';
import { actionRoute } from 'Utils/links';
import actions from '~/actions';
import AppContext from '~/contexts';
import routes from '~/routes';

import styles from './styles.scss';
import messages from './messages';
import ResponsiveImage from 'Components/ResponsiveImage';

const { LOGOUT } = actions;
const { HOME } = routes;

const { STANDARD } = cardTypes;

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

    const hasAvatar = avatar.length > 0;
    const hasCover = cover.length > 0;

    return (
      <Card title={username} type={STANDARD}>
        <div className={styles.topSection}>
          {hasCover ? (
            <div className={styles.coverPositionner}>
              <ResponsiveImage alt={t('cover')} images={cover} className={styles.coverImage} objectFit />
            </div>
          ) : null}
          <div className={styles.topSectionContent}>
            <div className={styles.avatar}>
              {hasAvatar ? (
                <p>
                  <UserProfile images={avatar} type={userProfileTypes.STANDARD} />
                </p>
              ) : (
                <p>No avatar!</p>
              )}
            </div>
          </div>
        </div>
        <form action={actionRoute(LOGOUT)} method="POST" encType="multipart/form-data">
          <button type="submit">{t('logout')}</button>
        </form>
      </Card>
    );
  }
}

export const Profile = Translate(messages)(ProfileRaw);
