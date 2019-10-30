import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useQuery } from '@apollo/react-hooks';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import ALBUM_WITH_MEDIA from 'Apollo/queries/albumWithMedia.gql';
import AlbumAddButtons from 'Components/Album/AlbumAddButtons';
import AlbumGrid from 'Components/Album/AlbumGrid';
import Attribution from 'Components/Attribution';
import Card, { cardTypes } from 'Components/Card';
import DualContainer from 'Components/DualContainer/index';
import ErrorMessage from 'Components/ErrorMessage';
import Menu from 'Components/Menu';
import menuStyles from 'Components/Menu/styles.scss';
import { positions } from 'Components/Menu/constants';
import Paragraph from 'Components/Paragraph';
import Spinner from 'Components/Spinner';
import { userboxSizes } from 'Components/User/Userbox';
import Translate from 'Hocs/Translate';
import { batchPhotoUploadForAlbumRoute } from 'Utils/links';
import { getFirstAlbumImageUrl } from 'Utils/media';
import { ALBUM_MENU } from '~/ids';

import messages from './messages';
import styles from './styles.scss';

const PAGINATION_ITEM_COUNT = 30;

const { STANDARD } = cardTypes;
const { SMALL } = userboxSizes;
const { LEFT } = positions;

const AlbumRaw = ({ match, t }) => {
  const { id } = match.params;

  const { data, error, fetchMore, loading } = useQuery(ALBUM_WITH_MEDIA, {
    variables: {
      id,
      startItem: 0,
      countItems: PAGINATION_ITEM_COUNT,
    },
  });

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage />;

  const {
    album: {
      actions: { add: userCanAdd },
      description,
      submitter,
      title,
    },
    listMedia,
  } = data;

  const [media, setMedia] = useState(listMedia);
  const [reachedEnd, setReachedEnd] = useState(false);
  const loadMoreRef = useRef(null);

  const lastIndex = media.length - 1;

  const getNext = () => {
    if (reachedEnd) {
      return;
    }

    fetchMore({
      variables: {
        albumId: id,
        startItem: lastIndex + 1,
        countItems: PAGINATION_ITEM_COUNT,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        const returnedItemCount = fetchMoreResult.listMedia.length;
        if (!fetchMoreResult) {
          return prev;
        }

        if (returnedItemCount < PAGINATION_ITEM_COUNT) {
          setReachedEnd(true);
        }

        const newMedia = [...media, ...fetchMoreResult.listMedia];
        setMedia(newMedia);

        return newMedia;
      },
    });
  };

  const options = [];
  if (userCanAdd) {
    const batchUploadUrl = batchPhotoUploadForAlbumRoute(id);
    options.push(() => (
      <div className={menuStyles.menuEntry}>
        <Link to={batchUploadUrl}>{t('batchUpload')}</Link>
      </div>
    ));
  }

  const image = getFirstAlbumImageUrl(media);
  return (
    <Card type={STANDARD} title={title}>
      <Helmet>
        {title && <title>{title}</title>}
        {title && <meta property="og:title" content={title} />}
        {description && <meta property="og:description" content={description} />}
        {image && <meta property="og:image" content={image} />}
      </Helmet>
      {userCanAdd && (
        <DualContainer>
          <Attribution
            className={styles.attribution}
            submitter={submitter}
            userboxSize={SMALL}
            short={false}
          />
          <div className={styles.actionsContainer}>
            <AlbumAddButtons albumId={id} />
            {options.length > 0 && (
              <div>
                <Menu
                  menuId={ALBUM_MENU}
                  triggerLabel={t('albumMenuLabel')}
                  className={styles.albumMenu}
                  options={options}
                  preferredHorizontal={LEFT}
                />
              </div>
            )}
          </div>
        </DualContainer>
      )}
      {description && (
        <Paragraph withAutoLink ugc>
          {description}
        </Paragraph>
      )}
      <AlbumGrid media={media} />
      <button
        type="button"
        onClick={getNext}
        ref={loadMoreRef}
        className={classnames({ [styles.hidden]: reachedEnd })}
        style={{ backgroundColor: '#fff' }}
      >
        {t('loadMore')}
      </button>
    </Card>
  );
};

AlbumRaw.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  t: PropTypes.func.isRequired,
};

export const Album = Translate(messages)(AlbumRaw);
