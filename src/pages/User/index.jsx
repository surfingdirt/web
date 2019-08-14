import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import USER from 'Apollo/queries/user4.gql';
import AlbumPreview from 'Components/AlbumPreview';
import Cover from 'Components/Cover/index';
import Card, { cardTypes } from 'Components/Card';
import DataRenderer from 'Components/DataRenderer';
import Heading, { headingTypes } from 'Components/Heading/index';
import { albumRoute } from 'Utils/links';

import styles from './styles.scss';

const { BARE, STANDARD } = cardTypes;
const { PRIMARY } = headingTypes;

export const User = ({ match }) => {
  const { id: userId } = match.params;

  return (
    <DataRenderer
      query={USER}
      variables={{ userId }}
      render={(data) => {
        const {
          user: { avatar, cover, username },
          listAlbums,
        } = data;

        return (
          <Fragment>
            <Card type={BARE}>
              <Cover cover={cover} avatar={avatar} />
              <div className={styles.contentWrapper}>
                <Heading className={styles.username} type={PRIMARY}>
                  {username}
                </Heading>
              </div>
            </Card>

            {listAlbums.map((album) => (
              <Card
                className={styles.albumCard}
                key={album.id}
                title={album.title}
                titleLink={albumRoute(album.id)}
                type={STANDARD}
              >
                <AlbumPreview album={album} />
              </Card>
            ))}
          </Fragment>
        );
      }}
    />
  );
};

User.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
