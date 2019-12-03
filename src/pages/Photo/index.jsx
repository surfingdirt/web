import React from 'react';
import PropTypes from 'prop-types';

import PHOTO from 'Apollo/queries/photo.gql';
import DataRenderer from 'Components/DataRenderer';
import MediaPageContent from 'Components/Media/MediaPageContent';
import { mediaTypes } from 'Utils/media';
import Translate from 'Hocs/Translate';
import messages from 'Pages/Page404/messages';

const { PHOTO: PHOTO_TYPE } = mediaTypes;

const Photo = ({ match }) => {
  const { id } = match.params;

  return (
    <DataRenderer
      query={PHOTO}
      variables={{ id }}
      render={({ photo }) => <MediaPageContent mediaType={PHOTO_TYPE} media={photo} />}
    />
  );
};

Photo.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Translate(messages)(Photo);
