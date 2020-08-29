import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Button, { buttonTypes } from 'Components/Widgets/Button';
import Card, { cardTypes } from 'Components/Widgets/Card';
import DualContainer from 'Components/Widgets/DualContainer';
import MediaThumb from 'Components/Media/MediaThumb';
import TranslateButton, { translateButtonTypes } from 'Components/Widgets/TranslateButton';
import Translate from 'Hocs/Translate';
import { AlbumType, MediaType } from 'Utils/types';

import messages from './messages';
import styles from './styles.scss';

const { STANDARD } = cardTypes;
const { ACTION } = buttonTypes;
const { MEDIA } = translateButtonTypes;

const EntryItem = ({ className, item, locale, t, voteLink }) => {
  const {
    description: { text: description },
    id,
    mediaType,
    thumbs,
    thumbWidth,
    title: { text: title },
    vendorUrl,
  } = item;
  const attrs = { className: styles.thumb, id, maxWidth: thumbWidth, mediaType, title, thumbs };

  const target = '_blank';

  return (
    <li className={className}>
      <Card type={cardTypes.BARE}>
        <div className={classnames(styles.wrapper)}>
          <MediaThumb {...attrs} objectFit="cover" to={vendorUrl} target={target} />
          <div className={styles.info}>
            <DualContainer nowrap className={styles.header}>
              <a href={vendorUrl} target={target}>
                <h1 className={styles.title}>{title}</h1>
              </a>
              <div className={styles.voteWrapper}>
                <Button href={voteLink} targetBlank type={ACTION} label={t('vote')} />
              </div>
            </DualContainer>
            <div className={styles.descriptionWrapper}>
              <p className={styles.description}>{description}</p>
              <TranslateButton
                className={styles.translateButton}
                type={MEDIA}
                id={id}
                targetLocale={locale}
              />
            </div>
          </div>
        </div>
      </Card>
    </li>
  );
};

EntryItem.propTypes = {
  album: AlbumType.isRequired,
  className: PropTypes.string.isRequired,
  item: MediaType.isRequired,
  locale: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  voteLink: PropTypes.string.isRequired,
};

export default Translate(messages)(EntryItem);
