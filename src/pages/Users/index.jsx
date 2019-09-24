import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import USERS from 'Apollo/queries/listUsers2.gql';
import Card, { cardTypes } from 'Components/Card';
import DataRenderer from 'Components/DataRenderer';
import Userbox from 'Components/User/Userbox';
import Translate from 'Hocs/Translate';

import messages from './messages';
import styles from './styles.scss';

const { STANDARD } = cardTypes;

const more = [
  { avatar: null, bio: null, cover: null, userId: "b72b9d69-141e-4acd-acb7-e2aac6978a6d", username: "Mountainboard Archives", __typename: "User" },
  { avatar: null, bio: null, cover: null, userId: "172b9d69-141e-4acd-acb7-e2aac6978a6d", username: "Evan", __typename: "User" },
  { avatar: null, bio: null, cover: null, userId: "272b9d69-141e-4acd-acb7-e2aac6978a6d", username: "Big Toe", __typename: "User" },
  { avatar: null, bio: null, cover: null, userId: "372b9d69-141e-4acd-acb7-e2aac6978a6d", username: "Caleb", __typename: "User" },
  { avatar: null, bio: null, cover: null, userId: "472b9d69-141e-4acd-acb7-e2aac6978a6d", username: "MBS", __typename: "User" },
  { avatar: null, bio: null, cover: null, userId: "572b9d69-141e-4acd-acb7-e2aac6978a6d", username: "Pélican", __typename: "User" },
  { avatar: null, bio: null, cover: null, userId: "672b9d69-141e-4acd-acb7-e2aac6978a6d", username: "Vincent", __typename: "User" },
  { avatar: null, bio: null, cover: null, userId: "772b9d69-141e-4acd-acb7-e2aac6978a6d", username: "Kody", __typename: "User" },
  { avatar: null, bio: null, cover: null, userId: "872b9d69-141e-4acd-acb7-e2aac6978a6d", username: "Akoni Kama", __typename: "User" },
  { avatar: null, bio: null, cover: null, userId: "972b9d69-141e-4acd-acb7-e2aac6978a6d", username: "Predrag", __typename: "User" },
  { avatar: null, bio: null, cover: null, userId: "072b9d69-141e-4acd-acb7-e2aac6978a6d", username: "Phil Elnieh", __typename: "User" },
  { avatar: null, bio: null, cover: null, userId: "a72b9d69-141e-4acd-acb7-e2aac6978a6d", username: "Joel", __typename: "User" },
];


const UsersRaw = ({ t }) => (
  <DataRenderer
    query={USERS}
    render={({ listUsers }) => (
      <Card type={STANDARD} title={t('title')}>
        <Helmet>{<meta property="og:title" content={t('title')} />}</Helmet>
        <ul className={styles.list}>
          {listUsers.concat(more).map((user) => (
            <li key={user.userId}>
              <Userbox user={user} />
            </li>
          ))}
        </ul>
      </Card>
    )}
  />
);

UsersRaw.propTypes = {
  t: PropTypes.func.isRequired,
};

export const Users = Translate(messages)(UsersRaw);
