import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import UserProfile, { userProfileTypes } from 'Components/User/UserProfile';
import PopupActionButton from 'Components/Widgets/PopupActionButton';
import NamedNavigationItem from 'Components/Widgets/NamedNavigationItem';
import SVG from 'Components/Widgets/SVG/index';
import BottomBarBackground from 'Images/bottom-bar.svg';
import BottomBarActions from 'Sections/BottomBarActions';
import Translate from 'Hocs/Translate/index';
import icons, { getIcon } from 'Utils/icons';
import sizes from 'Utils/iconSizes';
import AppContext from '~/contexts';
import routes from '~/routes';

import { MORE_NAVIGATION_ID, PROFILE_NAVIGATION_ID } from '../constants';
import messages from '../messages';
import styles from './styles.scss';

const ACTION_ITEMS_ID = 'action-items';
const { PROFILE } = icons;
const { STANDARD } = sizes;
const { HOME } = routes;

const Index = ({
  actionButtonRef,
  actionButtonOrigin,
  actionLinkListRef,
  actionItems,
  bottomBarActionsOpen,
  bottomBarRef,
  closeAll,
  moreNavigationMenuOpen,
  profileNavigationMenuOpen,
  onPlusClick,
  openMoreNavigationMenu,
  openProfileNavigationMenu,
  t,
}) => {
  const {
    login: {
      data: {
        me: { avatar, username },
      },
    },
  } = useContext(AppContext);

  const loggedIn = !!username;
  const hasAvatar = avatar && avatar.length > 0;

  return (
    <nav className={styles.bottomBar} aria-label={t('actionNav')} ref={bottomBarRef}>
      <div
        aria-hidden="true"
        className={classnames(styles.overlay, styles.actionButtonOverlay, {
          [styles.overlayVisible]: bottomBarActionsOpen,
        })}
        onClick={closeAll}
      />

      {/* MORE button */}
      <button
        type="button"
        className={styles.more}
        aria-haspopup="true"
        aria-expanded={moreNavigationMenuOpen}
        aria-controls={MORE_NAVIGATION_ID}
        onClick={openMoreNavigationMenu}
      >
        <NamedNavigationItem
          label={t('more')}
          visual={getIcon({
            type: icons.THREEDOTS_HORIZONTAL,
            presentationOnly: true,
            size: STANDARD,
          })}
        />
      </button>

      {/* PLUS button */}
      <div className={styles.plusButtonWrapper}>
        <button
          type="button"
          className={styles.plusButtonOffset}
          onClick={onPlusClick}
          aria-haspopup="true"
          aria-expanded={bottomBarActionsOpen}
          aria-controls={ACTION_ITEMS_ID}
        >
          <PopupActionButton
            ref={actionButtonRef}
            className={styles.plusButton}
            active={bottomBarActionsOpen}
          >
            {getIcon({
              type: icons.CLOSE,
              label: t('actionButton'),
              className: classnames(styles.closeIcon, {
                [styles.closeIconActive]: bottomBarActionsOpen,
              }),
            })}
          </PopupActionButton>

          <BottomBarActions
            className={classnames(styles.bottomBarActionContainer, {
              [styles.bottomBarActionContainerVisible]: bottomBarActionsOpen,
            })}
            id={ACTION_ITEMS_ID}
            items={actionItems}
            open={bottomBarActionsOpen}
            origin={actionButtonOrigin}
            ref={actionLinkListRef}
          />
        </button>
        <NamedNavigationItem
          aria-hidden="true"
          className={styles.plusLabel}
          label={t('actionButton')}
          visual={<div className={styles.plusPlaceholder} />}
        />
      </div>

      {/* HOME button */}
      <Link to={HOME} className={styles.home}>
        <NamedNavigationItem
          label={t('home')}
          visual={getIcon({ type: icons.HOME, size: STANDARD, presentationOnly: true })}
        />
      </Link>

      {/* PROFILE button */}
      <button
        type="button"
        className={styles.profile}
        aria-haspopup="true"
        aria-expanded={profileNavigationMenuOpen}
        aria-controls={PROFILE_NAVIGATION_ID}
        onClick={openProfileNavigationMenu}
      >
        <NamedNavigationItem
          label={loggedIn ? username : t('account')}
          visual={
            loggedIn && hasAvatar ? (
              <UserProfile username={username} images={avatar} type={userProfileTypes.FILL} />
            ) : (
              getIcon({ type: PROFILE, presentationOnly: true, size: STANDARD })
            )
          }
        />
      </button>

      {/* ACTIVITY button */}
      <div className={styles.activity}>
        <NamedNavigationItem
          label={t('activity')}
          visual={getIcon({ type: icons.ACTIVITY, size: STANDARD, presentationOnly: true })}
        />
      </div>

      <div className={styles.bottomBarBackground}>
        <SVG icon={BottomBarBackground} hollow presentationOnly />
      </div>
    </nav>
  );
};
Index.propTypes = {
  actionButtonRef: PropTypes.shape({
    current: PropTypes.instanceOf(typeof Element === 'undefined' ? () => {} : Element),
  }).isRequired,
  actionLinkListRef: PropTypes.shape({
    current: PropTypes.instanceOf(typeof Element === 'undefined' ? () => {} : Element),
  }).isRequired,
  actionButtonOrigin: PropTypes.arrayOf(PropTypes.number).isRequired,
  actionItems: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  bottomBarRef: PropTypes.shape({
    current: PropTypes.instanceOf(typeof Element === 'undefined' ? () => {} : Element),
  }).isRequired,
  bottomBarActionsOpen: PropTypes.bool.isRequired,
  closeAll: PropTypes.func.isRequired,
  moreNavigationMenuOpen: PropTypes.bool.isRequired,
  profileNavigationMenuOpen: PropTypes.bool.isRequired,
  onPlusClick: PropTypes.func.isRequired,
  openMoreNavigationMenu: PropTypes.func.isRequired,
  openProfileNavigationMenu: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(Index);
