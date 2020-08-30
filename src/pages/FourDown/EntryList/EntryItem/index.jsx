import React, { useContext } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Button, { buttonTypes } from 'Components/Widgets/Button';
import Card, { cardTypes } from 'Components/Widgets/Card';
import DualContainer from 'Components/Widgets/DualContainer';
import MediaThumb from 'Components/Media/MediaThumb';
import Translate from 'Hocs/Translate';
import { AlbumType, MediaType } from 'Utils/types';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { ACTION } = buttonTypes;

const EntryItem = ({ className, item, t }) => {
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
              <Button href={formUrl} targetBlank type={ACTION} label={t('vote')} />
            </div>
          </DualContainer>
          <div className={styles.descriptionWrapper}>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

EntryItem.propTypes = {
  className: PropTypes.string.isRequired,
  item: MediaType.isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(EntryItem);
