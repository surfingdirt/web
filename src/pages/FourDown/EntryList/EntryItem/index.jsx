import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Button, { buttonTypes } from 'Components/Widgets/Button';
import Card, { cardTypes } from 'Components/Widgets/Card';
import DualContainer from 'Components/Widgets/DualContainer';
import MediaThumb from 'Components/Media/MediaThumb';
import { InlineSpinner } from 'Components/Widgets/Spinner';
import Translate from 'Hocs/Translate';
import { fourDownLoginRoute, fourDownVideoRoute } from 'Utils/links';
import { MediaType } from 'Utils/types';
import AppContext from '~/contexts';
import icons, { getIcon } from 'Utils/icons';
import sizes from 'Utils/iconSizes';

import messages from './messages';
import styles from './styles.scss';

const { ACTION, MAIN } = buttonTypes;

const EntryItem = ({ hasVoted, item, onVoteClick, t, voteInProgress }) => {
  const {
    login: {
      data: {
        me: { username },
      },
    },
  } = useContext(AppContext);

  const isLoggedIn = !!username;

  const {
    description: { text: description },
    formUrl,
    id,
    mediaType,
    selected,
    thumbs,
    thumbWidth,
    vendorUrl,
    videoTitle,
  } = item;

  const attrs = {
    className: styles.thumb,
    id,
    maxWidth: thumbWidth,
    mediaType,
    title: videoTitle,
    thumbs,
  };

  const target = '_blank';

  const buttonProps = {
    type: hasVoted ? MAIN : ACTION,
    label: t('vote'),
    className: styles.voteButton,
  };
  if (isLoggedIn) {
    // add an onClick with a call to a dedicated mutation hook
    buttonProps.onClick = () => {
      console.log('EntryItem - voting yo', id);
      onVoteClick(id);
    };
    if (voteInProgress === id) {
      // We just clicked on this button
      buttonProps.disabled = true;
      buttonProps.label = <InlineSpinner className={styles.spinner} />;
    } else if (voteInProgress) {
      // Some other button was clicked
      buttonProps.disabled = true;
    } else if (selected) {
      buttonProps.label = (
        <span className={styles.selectedContent}>
          {getIcon({
            type: icons.CHECK,
            size: sizes.SMALL,
            className: styles.selectedIcon,
          })}
          {t('selected')}
        </span>
      );
    }
  } else {
    // add props to send the user to the login page
    buttonProps.href = fourDownLoginRoute(id);
  }

  /*
  if error, add these to the Vote button:
      buttonProps.href = formUrl;
      buttonProps.targetBlank = true;
   */

  return (
    <Card type={cardTypes.BARE}>
      <div className={classnames(styles.wrapper)}>
        <MediaThumb {...attrs} objectFit="cover" to={vendorUrl} target={target} />
        <div className={styles.info}>
          <DualContainer nowrap className={styles.header}>
            <a href={vendorUrl} target={target}>
              <h1 className={styles.title}>{videoTitle}</h1>
            </a>
            <div className={styles.voteWrapper}>
              <Button {...buttonProps} />
            </div>
          </DualContainer>
          <div className={styles.descriptionWrapper}>
            <p className={styles.description}>{description}</p>
          </div>
          <div className={styles.shareWrapper}>
            <Link to={fourDownVideoRoute(id)}>{t('shareLink')}</Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

EntryItem.propTypes = {
  hasVoted: PropTypes.bool.isRequired,
  item: MediaType.isRequired,
  onVoteClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  voteInProgress: PropTypes.string.isRequired,
};

export default Translate(messages)(EntryItem);
