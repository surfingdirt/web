import React, { Fragment, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import DELETE_ALBUM from 'Apollo/mutations/deleteAlbum.gql';
import AlbumAddButtons from 'Components/Album/AlbumAddButtons';
import AlbumGrid from 'Components/Media/Layouts/AlbumGrid';
import AlbumList from 'Components/Media/Layouts/AlbumList';
import Mosaic from 'Components/Media/Layouts/Mosaic';
import AlbumViewToggle, {
  ALBUM_VIEW_GRID,
  ALBUM_VIEW_LIST,
} from 'Components/Album/AlbumViewToggle';
import Date from 'Components/Widgets/Date';
import Attribution from 'Components/Widgets/Attribution';
import Button, { buttonTypes } from 'Components/Widgets/Button';
import Card, { cardTypes } from 'Components/Widgets/Card';
import DeleteItemModal from 'Components/Widgets/DeleteItemModal';
import DualContainer from 'Components/Widgets/DualContainer/index';
import Menu from 'Components/Widgets/Menu';
import menuStyles from 'Components/Widgets/Menu/styles.scss';
import { positions } from 'Components/Widgets/Menu/constants';
import Paragraph from 'Components/Widgets/Paragraph';
import TranslateButton, { translateButtonTypes } from 'Components/Widgets/TranslateButton';
import { userboxSizes } from 'Components/User/Userbox';
import { ALBUM_NOT_EMPTY } from 'Error/errorCodes';
import Translate from 'Hocs/Translate';
import { batchPhotoUploadForAlbumRoute, editAlbumRoute } from 'Utils/links';
import AppContext from '~/contexts';
import { ALBUM_MENU } from '~/ids';
import routes from '~/routes';

import messages from './messages';
import styles from './styles.scss';

const { ACTION } = buttonTypes;
const { STANDARD } = cardTypes;
const { SMALL } = userboxSizes;
const { LEFT } = positions;
const { PROFILE } = routes;
const { ALBUM } = translateButtonTypes;

const AlbumView = ({
  album,
  countItems,
  fetchMore,
  listMedia,
  locale,
  t,
  viewType: initialViewType,
}) => {
  const { features } = useContext(AppContext);
  const [deleteError, setDeleteError] = useState(null);
  const [media, setMedia] = useState(listMedia);
  // reachedEnd is set to true if we already have fewer items than in a whole pagination:
  const [reachedEnd, setReachedEnd] = useState(media.length < countItems);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);
  const [viewType, setViewType] = useState(initialViewType || ALBUM_VIEW_GRID);

  const {
    actions: { add: userCanAdd, delete: userCanDelete, edit: userCanEdit },
    date,
    description: { text: description },
    id: albumId,
    submitter,
    title: { text: title, locale: textLocale, original },
  } = album;

  const lastIndex = media.length - 1;

  const getNext = () => {
    if (reachedEnd) {
      return;
    }

    setIsLoadingMore(true);

    fetchMore({
      variables: {
        albumId,
        startItem: lastIndex + 1,
        countItems,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        setIsLoadingMore(false);
        const returnedItemCount = fetchMoreResult.listMedia.length;
        if (!fetchMoreResult) {
          return prev;
        }

        if (returnedItemCount < countItems) {
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
    const batchUploadUrl = batchPhotoUploadForAlbumRoute(albumId);
    options.push(() => (
      <div className={menuStyles.menuEntry}>
        <Link to={batchUploadUrl}>{t('batchUpload')}</Link>
      </div>
    ));
  }
  if (userCanEdit) {
    options.push(() => (
      <div className={menuStyles.menuEntry}>
        <Link to={editAlbumRoute(albumId)}>{t('edit')}</Link>
      </div>
    ));
  }
  if (userCanDelete) {
    const variables = { id: albumId };
    const update = (cache, resultObj) => {
      const success = !!Object.values(resultObj.data);
      if (!success) {
        console.warn('Received false for album delete', { id });
      }
      // We might need to update the cache
      setRedirectTo(PROFILE);
    };

    const onDeleteError = (code) => {
      let message = t('backendError');
      if (code === ALBUM_NOT_EMPTY) {
        message = t('cannotDeleteNonEmptyAlbums');
      }
      setDeleteError(message);
    };

    options.push(() => (
      <DeleteItemModal
        mutation={DELETE_ALBUM}
        variables={variables}
        title={title}
        update={update}
        onError={onDeleteError}
      />
    ));
  }

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  // Show the button if the text is in its original form and the locale is not that of the user
  const showTranslateButton = features.translation && original && textLocale !== locale;

  return (
    <Card type={STANDARD} title={title}>
      {deleteError && <p className={styles.error}>{deleteError}</p>}
      <DualContainer>
        <div>
          <Attribution
            className={styles.attribution}
            submitter={submitter}
            userboxSize={SMALL}
            short={false}
          />
          {showTranslateButton && (
            <Fragment>
              <span aria-hidden className={styles.separator}>
                &bull;
              </span>
              <TranslateButton
                className={styles.translateButton}
                type={ALBUM}
                id={albumId}
                targetLocale={locale}
              />
            </Fragment>
          )}
        </div>
        <div className={styles.actionsContainer}>
          {userCanAdd && (
            <Fragment>
              <AlbumAddButtons albumId={albumId} />
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
            </Fragment>
          )}
        </div>
      </DualContainer>

      {description && (
        <Paragraph withAutoLink ugc>
          {description}
        </Paragraph>
      )}

      <DualContainer className={styles.metadata}>
        <Date className={styles.date} date={date} locale={locale} />
        <AlbumViewToggle onChange={setViewType} viewType={viewType} />
      </DualContainer>

      {viewType === ALBUM_VIEW_GRID && <AlbumGrid album={album} media={media} />}
      {viewType === ALBUM_VIEW_LIST && <AlbumList album={album} media={media} />}

      {!reachedEnd && (
        <div className={styles.loadMoreWrapper}>
          <Button type={ACTION} loading={isLoadingMore} label={t('loadMore')} onClick={getNext} />
        </div>
      )}
    </Card>
  );
};

AlbumView.propTypes = {
  album: PropTypes.objectOf(PropTypes.any).isRequired,
  countItems: PropTypes.number.isRequired,
  fetchMore: PropTypes.func.isRequired,
  listMedia: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  t: PropTypes.func.isRequired,
  viewType: PropTypes.string,
};

AlbumView.defaultProps = {
  viewType: null,
};

export default Translate(messages)(AlbumView);
