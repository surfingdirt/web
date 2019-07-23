import React from 'react';
import PropTypes from 'prop-types';

import AvatarUpdateForm from 'Components/AvatarUpdateForm';
import CoverUpdateForm from 'Components/CoverUpdateForm';
import ResponsiveImage from 'Components/ResponsiveImage';
import UserProfile, { userProfileTypes } from 'Components/UserProfile';
import Translate from 'Hocs/Translate';

import styles from './styles.scss';
import messages from './messages';

const { RESPONSIVE } = userProfileTypes;

const Cover = ({ avatar, t, cover, withUpdateForms }) => {
  const hasAvatar = avatar && avatar.length > 0;
  const hasCover = cover && cover.length > 0;

  return (
    <div className={styles.coverWrapper}>
      <div className={styles.coverImagePositionner}>
        {hasCover && <ResponsiveImage alt={t('cover')} images={cover} objectFit />}
      </div>

      {hasAvatar && (
        <div className={styles.avatarPositionner}>
          <UserProfile images={avatar} type={RESPONSIVE} />
        </div>
      )}

      <div className={styles.coverContent}>
        {withUpdateForms && (
          <div className={styles.avatarFormPositionner}>
            <AvatarUpdateForm />
          </div>
        )}
        {withUpdateForms && (
          <div className={styles.coverFormPositionner}>
            <CoverUpdateForm />
          </div>
        )}
      </div>
    </div>
  );
};

Cover.propTypes = {
  avatar: PropTypes.arrayOf(
    PropTypes.shape({
      height: PropTypes.number.isRequired,
      size: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  cover: PropTypes.arrayOf(
    PropTypes.shape({
      height: PropTypes.number.isRequired,
      size: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  t: PropTypes.func.isRequired,
  withUpdateForms: PropTypes.bool,
};

Cover.defaultProps = {
  withUpdateForm: false,
};

export default Translate(messages)(Cover);
