import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import ALBUM from 'Apollo/queries/album.gql';
import AlbumAddButtons from 'Components/Album/AlbumAddButtons';
import AlbumGrid from 'Components/Album/AlbumGrid';
import Attribution from 'Components/Attribution';
import Card, { cardTypes } from 'Components/Card';
import DataRenderer from 'Components/DataRenderer';
import DualContainer from 'Components/DualContainer';
import { userboxSizes } from 'Components/User/Userbox';
import Translate from 'Hocs/Translate';
import { getFirstAlbumImageUrl } from 'Utils/media';
import AppContext from '~/contexts';

import messages from './messages';

const COUNT_ITEMS = 25;

const { STANDARD } = cardTypes;
const { SMALL } = userboxSizes;

class AlbumRaw extends React.Component {
  static propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    t: PropTypes.func.isRequired,
  };

  static contextType = AppContext;

  render() {
    const { match, t } = this.props;
    const { id: albumId } = match.params;

    return (
      <DataRenderer
        query={ALBUM}
        variables={{ id: albumId, countItems: COUNT_ITEMS }}
        render={({
          album: {
            actions: { add: userCanAdd },
            description,
            media,
            submitter,
            title,
          },
        }) => {
          const image = getFirstAlbumImageUrl(media);
          return (
            <Card type={STANDARD} title={title}>
              <Helmet>
                {title && <meta property="og:title" content={title} />}
                {description && <meta property="og:description" content={description} />}
                {image && <meta property="og:image" content={image} />}
              </Helmet>
              {userCanAdd && (
                <DualContainer>
                  <Attribution submitter={submitter} userboxSize={SMALL} short={false} />
                  <div>
                    <AlbumAddButtons albumId={albumId} />
                  </div>
                </DualContainer>
              )}
              <AlbumGrid media={media} />
            </Card>
          );
        }}
      />
    );
  }
}

export const Album = Translate(messages)(AlbumRaw);
