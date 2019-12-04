import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

import USERS from 'Apollo/queries/listUsers2.gql';
import Card, { cardTypes } from 'Components/Card';
import DataRenderer from 'Components/DataRenderer';
import Userbox from 'Components/User/Userbox';
import Translate from 'Hocs/Translate';

import messages from './messages';
import styles from './styles.scss';

const { STANDARD } = cardTypes;

const Users = ({ t }) => (
  <DataRenderer
    query={USERS}
    render={({ listUsers }) => (
      <Card type={STANDARD} title={t('title')}>
        <Helmet>{<meta property="og:title" content={t('title')} />}</Helmet>
        <ul className={styles.list}>
          {listUsers.map((user) => (
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

export default Translate(messages)(Users);
