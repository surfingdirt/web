import React, { Fragment, useContext } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Cover from 'Components/Cover/index';
import Heading, { headingTypes } from 'Components/Widgets/Heading/index';
import Paragraph from 'Components/Widgets/Paragraph';
import TranslateButton, { translateButtonTypes } from 'Components/Widgets/TranslateButton';
import { UserType } from 'Utils/types';
import AppContext from '~/contexts';

import styles from './styles.scss';

const { PRIMARY } = headingTypes;
const { USER: USER_BUTTON } = translateButtonTypes;

const MIN_DROPCAP_LENGTH = 200;

// TODO: dedupe code between this and pages/Profile/index.jsx

const User = ({ bareContent, user }) => {
  const { features, locale } = useContext(AppContext);

  const {
    avatar,
    bio: { text: bio, locale: textLocale, original },
    cover,
    username,
    userId,
  } = user;

  // Show the button if the text is in its original form and the locale is not that of the user
  const showTranslateButton = features.translation && original && textLocale !== locale;

  return (
    <Fragment>
      <Cover cover={cover} avatar={avatar} username={username} />
      <div className={classnames(styles.contentWrapper, { [styles.bareContent]: bareContent })}>
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
    </Fragment>
  );
};

User.propTypes = {
  bareContent: PropTypes.bool,
  user: UserType.isRequired,
};

User.defaultProps = {
  bareContent: false,
};

export default User;
