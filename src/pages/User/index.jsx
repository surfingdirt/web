import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import USER from 'Apollo/queries/user.gql';
import Cover from 'Components/Cover';
import Card, { cardTypes } from 'Components/Card';
import DataRenderer from 'Components/DataRenderer';
import Heading, { headingTypes } from 'Components/Heading';
import { albumRoute } from 'Utils/links';

import styles from './styles.scss';

const { BARE } = cardTypes;
const { PRIMARY } = headingTypes;

export const User = ({ match }) => {
  const { id: userId } = match.params;

  return (
    <Card type={BARE}>
      <DataRenderer
        query={USER}
        variables={{ userId }}
        render={(data) => {
          const {
            user: { album, avatar, cover, username },
          } = data;

          const { id, title } = album;
          return (
            <Fragment>
              <Cover cover={cover} avatar={avatar} />
              <div className={styles.contentWrapper}>
                <Heading className={styles.username} type={PRIMARY}>
                  {username}
                </Heading>
                <span>Album:</span>&nbsp;<Link to={albumRoute(id)}>{title}</Link>
              </div>
            </Fragment>
          );
        }}
      />
    </Card>
  );
};

User.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
