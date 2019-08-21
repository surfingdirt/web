import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import USER from 'Apollo/queries/user.gql';
import AlbumPreview from 'Components/Album/AlbumPreview';
import Cover from 'Components/Cover/index';
import Card, { cardTypes } from 'Components/Card';
import DataRenderer from 'Components/DataRenderer';
import Heading, { headingTypes } from 'Components/Heading/index';
import Paragraph from 'Components/Paragraph';

import styles from './styles.scss';

const { BARE } = cardTypes;
const { PRIMARY } = headingTypes;

export const User = ({ match }) => {
  const { id: userId } = match.params;

  return (
    <DataRenderer
      query={USER}
      variables={{ userId }}
      render={(data) => {
        const {
          user: { avatar, bio, cover, username },
          listAlbums,
        } = data;

        return (
          <Fragment>
            <Helmet>
              {username && <title>{username}</title>}
              {bio && <meta name="description" content={bio} />}
            </Helmet>

            <Card type={BARE}>
              <Cover cover={cover} avatar={avatar} />
              <div className={styles.contentWrapper}>
                <Heading className={styles.username} type={PRIMARY}>
                  {username}
                </Heading>
                {bio && (
                  <Paragraph widthDropCap className={styles.bio}>
                    {bio}
                  </Paragraph>
                )}
              </div>
            </Card>

            {listAlbums.map((album) => (
              <AlbumPreview album={album} key={album.id} />
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
