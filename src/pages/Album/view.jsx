import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import DELETE_ALBUM from 'Apollo/mutations/deleteAlbum.gql';
import AlbumAddButtons from 'Components/Album/AlbumAddButtons';
import AlbumGrid from 'Components/Album/AlbumGrid';
import Attribution from 'Components/Widgets/Attribution';
import Button, { buttonTypes } from 'Components/Widgets/Button';
import Card, { cardTypes } from 'Components/Widgets/Card';
import DeleteItemModal from 'Components/Widgets/DeleteItemModal';
import DualContainer from 'Components/Widgets/DualContainer/index';
import Menu from 'Components/Widgets/Menu';
import menuStyles from 'Components/Widgets/Menu/styles.scss';
import { positions } from 'Components/Widgets/Menu/constants';
import Paragraph from 'Components/Widgets/Paragraph';
import { userboxSizes } from 'Components/User/Userbox';
import { ALBUM_NOT_EMPTY } from 'Error/errorCodes';
import Translate from 'Hocs/Translate';
import { batchPhotoUploadForAlbumRoute, editAlbumRoute } from 'Utils/links';
import { ALBUM_MENU } from '~/ids';

import messages from './messages';
import styles from './styles.scss';

const { ACTION } = buttonTypes;
const { STANDARD } = cardTypes;
const { SMALL } = userboxSizes;
const { LEFT } = positions;

const AlbumView = ({ album, countItems, fetchMore, listMedia, t }) => {
  const [deleteError, setDeleteError] = useState(null);
  const [media, setMedia] = useState(listMedia);
  // reachedEnd is set to true if we already have fewer items than in a whole pagination:
  const [reachedEnd, setReachedEnd] = useState(media.length < countItems);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const {
    actions: { add: userCanAdd, delete: userCanDelete, edit: userCanEdit },
    description: { text: description },
    id: albumId,
    submitter,
    title: { text: title },
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

  if (userCanDelete || true) {
    const variables = { id: albumId };
    const update = (cache, resultObj) => {
      const success = !!Object.values(resultObj.data);
      if (!success) {
        console.warn('Received false for album delete', { id });
        return;
      }
      debugger;
      // const updateVariables = {
      //   parentId,
      //   parentType,
      // };
      //
      // const { listComments } = cache.readQuery({
      //   query: LIST_COMMENTS,
      //   variables: updateVariables,
      // });
      // cache.writeQuery({
      //   query: LIST_COMMENTS,
      //   variables: updateVariables,
      //   data: { listComments: listComments.filter((c) => c.id !== id) },
      // });
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

  return (
    <Card type={STANDARD} title={title}>
      {deleteError && <p className={styles.error}>{deleteError}</p>}
      <DualContainer>
        <Attribution
          className={styles.attribution}
          submitter={submitter}
          userboxSize={SMALL}
          short={false}
        />
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
      <AlbumGrid album={album} media={media} />
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
};

export default Translate(messages)(AlbumView);
