import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Userbox from 'Components/User/Userbox';
import Presentation from 'Components/User/Presentation';
import Translate from 'Hocs/Translate';
import icons, { getIcon } from 'Utils/icons';
import iconSizes from 'Utils/iconSizes';
import { UserType } from 'Utils/types';

import messages from '../../messages';
import styles from '../../styles.scss';

const { PROFILE } = icons;
const iconSize = iconSizes.SMALL;

const RawHeader = ({ t, user }) => (
  <Fragment>
    <span className={styles.headerText}>{t('newUser')}:&nbsp;</span>
    <Userbox className={styles.userbox} user={user} inline />
  </Fragment>
);

RawHeader.propTypes = {
  user: UserType.isRequired,
  t: PropTypes.func.isRequired,
};

const Header = Translate(messages)(RawHeader);

export const getUserFeedEntryParts = (date, user) => {
  const { bio, userId, username } = user;

  if (bio.text) {
    return {
      content: <Presentation user={user} bareContent />,
      header: <Header user={user} userId={userId} username={username} />,
      icon: getIcon({ type: PROFILE, presentationOnly: true, size: iconSize }),
    };
  }

  return {
    content: bio ? <span className={styles.bio}>{bio.text}</span> : null,
    header: <Header user={user} userId={userId} username={username} />,
    icon: getIcon({ type: PROFILE, presentationOnly: true, size: iconSize }),
  };
};
