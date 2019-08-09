import React from 'react';
import PropTypes from 'prop-types';

import AvatarUpdateForm from 'Components/AvatarUpdateForm';
import CoverUpdateForm from 'Components/CoverUpdateForm';
import Menu, { MenuOption, MenuOptions, MenuTrigger } from 'Components/Menu';
import ResponsiveImage from 'Components/ResponsiveImage';
import UserProfile, { userProfileTypes } from 'Components/UserProfile';
import Translate from 'Hocs/Translate';
import icons, { getIcon, sizes } from 'Utils/icons';
import { COVER_MENU } from '~/ids';

import styles from './styles.scss';
import messages from './messages';

const { RESPONSIVE } = userProfileTypes;
const { STANDARD } = sizes;

const Cover = ({ avatar, t, cover, withUpdateForms }) => {
  const hasAvatar = avatar && avatar.length > 0;
  const hasCover = cover && cover.length > 0;

  const options = [];
  if (withUpdateForms) {
    options.push(
      <MenuOption
        key="1"
        onSelect={() => {
          console.log('click updateAvatar');
        }}
      >
        {t('updateAvatar')}
      </MenuOption>,
    );
    options.push(
      <MenuOption
        key="2"
        onSelect={() => {
          console.log('click updateCover');
        }}
      >
        {t('updateCover')}
      </MenuOption>,
    );
    options.push(
      <MenuOption
        key="3"
        onSelect={() => {
          console.log('click updateCover 2');
        }}
      >
        {t('updateCover')}
      </MenuOption>,
    );
  }

  // {withUpdateForms && false && (
  //   <div className={styles.avatarFormPositionner}>
  //     <AvatarUpdateForm />
  //   </div>
  // )}
  // {withUpdateForms && false && (
  //   <div className={styles.coverFormPositionner}>
  //     <CoverUpdateForm />
  //   </div>
  // )}

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
          <Menu menuId={COVER_MENU} className={styles.coverMenu}>
            <MenuTrigger>
              {getIcon({
                label: t('coverMenuLabel'),
                type: icons.THREEDOTS_VERTICAL,
                size: STANDARD,
              })}
            </MenuTrigger>
            <MenuOptions>{options}</MenuOptions>
          </Menu>
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
