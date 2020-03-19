import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import USER from 'Apollo/queries/user.gql';
import AlbumPreview from 'Components/Album/AlbumPreview';
import Cover from 'Components/Cover/index';
import Card, { cardTypes } from 'Components/Widgets/Card';
import DataRenderer from 'Components/Widgets/DataRenderer';
import Heading, { headingTypes } from 'Components/Widgets/Heading/index';
import Paragraph from 'Components/Widgets/Paragraph';
import TranslateButton, { translateButtonTypes } from 'Components/Widgets/TranslateButton';
import AppContext from '~/contexts';

import AlbumList from './AlbumList';
import styles from './styles.scss';

const { BARE } = cardTypes;
const { PRIMARY } = headingTypes;
const { USER: USER_BUTTON } = translateButtonTypes;

const MIN_DROPCAP_LENGTH = 200;

// TODO: dedupe code between this and pages/Profile/index.jsx

const User = ({ match }) => {
  const { features, locale } = useContext(AppContext);
  const { id: userId } = match.params;

  return (
    <DataRenderer
      query={USER}
      variables={{ userId }}
      render={(data) => {
        const {
          user: {
            avatar,
            bio: { text: bio, locale: textLocale, original },
            cover,
            username,
            userId,
          },
        } = data;

        // Show the button if the text is in its original form and the locale is not that of the user
        const showTranslateButton = features.translation && original && textLocale !== locale;

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
                  <Fragment>
                    <Paragraph
                      withDropCap={bio && bio.length > MIN_DROPCAP_LENGTH}
                      withAutoLink
                      className={styles.bio}
                      ugc
                    >
                      {bio}
                    </Paragraph>
                    {showTranslateButton && (
                      <TranslateButton
                        className={styles.translateButton}
                        type={USER_BUTTON}
                        id={userId}
                        targetLocale={locale}
                      />
                    )}
                  </Fragment>
                )}
              </div>
            </Card>

            <AlbumList userId={userId} />
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
