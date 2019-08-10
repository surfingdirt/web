import React from 'react';
import PropTypes from 'prop-types';

import Menu from 'Components/Menu';
import ResponsiveImage from 'Components/ResponsiveImage';
import UserProfile, { userProfileTypes } from 'Components/UserProfile';
import Translate from 'Hocs/Translate';
import WithModal from 'Hocs/WithModal';
import { COVER_MENU } from '~/ids';

import AvatarUpdateForm from './AvatarUpdateForm';
import CoverUpdateForm from './CoverUpdateForm';
import styles from './styles.scss';
import messages from './messages';

const { RESPONSIVE } = userProfileTypes;

const AvatarUpdateModal = WithModal({
  modalContent: (
    <div className={styles.avatarFormPositionner}>
      <AvatarUpdateForm />
    </div>
  ),
  modalTitle: 'This is a test modal title',
  ariaLabel: 'Update your avatar, yo!',
  shouldShowModal: () => {
    return true;
  },
})(<span>Update your avatar, yo!</span>);

const Cover = ({ avatar, t, cover, withUpdateForms }) => {
  const hasAvatar = avatar && avatar.length > 0;
  const hasCover = cover && cover.length > 0;

  console.log('Cover - render');

  const options = withUpdateForms
    ? [
        () => <AvatarUpdateModal />,
        {
          label: t('updateAvatar'),
          onSelect: () => {
            console.log('click updateAvatar');
          },
        },
        {
          label: t('updateCover'),
          onSelect: () => {
            console.log('click updateCover');
          },
        },
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
