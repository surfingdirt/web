import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import USER from 'Apollo/queries/user2.gql';
import AlbumPreview from 'Components/AlbumPreview';
import Cover from 'Components/Cover/index';
import Card, { cardTypes } from 'Components/Card';
import DataRenderer from 'Components/DataRenderer';
import Heading, { headingTypes } from 'Components/Heading';

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

          return (
            <Fragment>
              <Cover cover={cover} avatar={avatar} />
              <div className={styles.contentWrapper}>
                <Heading className={styles.username} type={PRIMARY}>
                  {username}
                </Heading>
                <AlbumPreview album={album} />
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
