import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import MEDIA from 'Apollo/queries/media.gql';
import Card, { cardTypes } from 'Components/Widgets/Card';
import DataRenderer from 'Components/Widgets/DataRenderer';
import PhotoEditForm from 'Components/Photo/EditForm';
import Translate from 'Hocs/Translate';
import { albumRoute } from 'Utils/links';
import { mediaTypes } from 'Utils/media';

import messages from './messages';
import styles from './styles.scss';

const { STANDARD } = cardTypes;
const { PHOTO } = mediaTypes;

const PhotoEdit = (props) => {
  const { match, t } = props;
  const { id } = match.params;

  return (
    <DataRenderer
      query={MEDIA}
      variables={{ id, mediaType: PHOTO.toLowerCase() }}
      render={(data) => {
        const { media } = data;
        const {
          album: {
            id: albumId,
            title: { text: title },
          },
        } = media;

        return (
          <Card title={t('photoEditPage')} type={STANDARD} className={styles.page}>
            <span className={styles.inAlbum}>
              {t('inAlbum')}
              {':'}
            </span>
            <Link to={albumRoute(albumId)}>{title}</Link>
            <PhotoEditForm media={media} />
          </Card>
        );
      }}
    />
  );
};

PhotoEdit.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(PhotoEdit);
