import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import ALBUM from 'Apollo/queries/album.gql';
import AlbumAddButtons from 'Components/Album/AlbumAddButtons';
import AlbumGrid from 'Components/Album/AlbumGrid';
import Card, { cardTypes } from 'Components/Card';
import DataRenderer from 'Components/DataRenderer';
import DualContainer from 'Components/DualContainer';
import Translate from 'Hocs/Translate';
import AppContext from '~/contexts';

import messages from './messages';

const { STANDARD } = cardTypes;

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
        variables={{ id: albumId }}
        render={({ album: { description, media, title } }) => (
          <Card type={STANDARD} title={title}>
            <Helmet>
              {title && <meta property="og:title" content={title} />}
              {description && <meta property="og:description" content={description} />}
            </Helmet>
            <DualContainer>
              <div />
              <div>
                <AlbumAddButtons albumId={albumId} />
              </div>
            </DualContainer>
            <AlbumGrid media={media} />
          </Card>
        )}
      />
    );
  }
}

export const Album = Translate(messages)(AlbumRaw);
