import React from 'react';
import PropTypes from 'prop-types';

import Menu from 'Components/Menu';
import ResponsiveImage from 'Components/ResponsiveImage';
import LogoutForm from 'Components/User/LogoutForm';
import menuStyles from 'Components/Menu/styles.scss';
import UserProfile, { userProfileTypes } from 'Components/User/UserProfile';
import Translate from 'Hocs/Translate';
import { COVER_MENU } from '~/ids';

import AvatarUpdateModal from './AvatarUpdate/Modal';
import CoverUpdateModal from './CoverUpdate/Modal';
import styles from './styles.scss';
import messages from './messages';

const { RESPONSIVE } = userProfileTypes;

const Cover = ({ avatar, t, cover, withUpdateForms }) => {
  const hasAvatar = avatar && avatar.length > 0;
  const hasCover = cover && cover.length > 0;

  const options = withUpdateForms
    ? [
        () => <AvatarUpdateModal />,
        () => <CoverUpdateModal />,
        () => <LogoutForm buttonClassName={menuStyles.menuEntry} />,
      ]
    : [];

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
        {options.length > 0 && (
          <Menu
            menuId={COVER_MENU}
            triggerLabel={t('coverMenuLabel')}
            className={styles.coverMenu}
            options={options}
          />
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
  ),
  cover: PropTypes.arrayOf(
    PropTypes.shape({
      height: PropTypes.number.isRequired,
      size: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    }),
  ),
  t: PropTypes.func.isRequired,
  withUpdateForms: PropTypes.bool,
};

Cover.defaultProps = {
  avatar: null,
  cover: null,
  withUpdateForms: false,
};

export default Translate(messages)(Cover);
