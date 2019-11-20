import React from 'react';
import PropTypes from 'prop-types';

import PHOTO from 'Apollo/queries/photo3.gql';
import DataRenderer from 'Components/Widgets/DataRenderer';
import MediaPageContent from 'Components/Media/MediaPageContent';
import { mediaTypes } from 'Utils/media';

const { PHOTO: PHOTO_TYPE } = mediaTypes;

export const Photo = ({ match }) => {
  const { id } = match.params;

  return (
    <DataRenderer
      query={PHOTO}
      variables={{ id }}
      render={({ listComments, photo }) => {
        const media = Object.assign({}, photo, { mediaType: PHOTO_TYPE });
        return <MediaPageContent media={media} comments={listComments} />;
      }}
    />
  );
};

Photo.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
