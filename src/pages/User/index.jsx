import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { Form, Field } from 'react-final-form';

import USER from 'Apollo/queries/user.gql';
import AlbumPreview from 'Components/Album/AlbumPreview';
import Cover from 'Components/Cover/index';
import Card, { cardTypes } from 'Components/Widgets/Card';
import DataRenderer from 'Components/Widgets/DataRenderer';
import Heading, { headingTypes } from 'Components/Widgets/Heading/index';
import Paragraph from 'Components/Widgets/Paragraph';

import styles from './styles.scss';

const { BARE } = cardTypes;
const { PRIMARY } = headingTypes;

const MIN_DROPCAP_LENGTH = 200;

// TODO: dedupe code between this and pages/Profile/index.jsx

const User = ({ match }) => {
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
              {username && <meta property="og:title" content={username} />}
              {bio && <meta property="og:description" content={bio} />}
            </Helmet>

            <Card type={BARE}>
              <Cover cover={cover} avatar={avatar} username={username} />
              <div className={styles.contentWrapper}>
                <Heading className={styles.username} type={PRIMARY}>
                  {username}
                </Heading>
                {bio && (
                  <Paragraph
                    withDropCap={bio && bio.length > MIN_DROPCAP_LENGTH}
                    withAutoLink
                    className={styles.bio}
                    ugc
                  >
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

export default User;
