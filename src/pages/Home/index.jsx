/* eslint-disable import/prefer-default-export */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import HOMEPAGE from 'Apollo/queries/home.gql';
import AlbumPreview from 'Components/AlbumPreview';
import Card, { cardTypes } from 'Components/Card';
import DataRenderer from 'Components/DataRenderer';
import Translate from 'Hocs/Translate';
import AppContext from '~/contexts';

import messages from './messages';

const { STANDARD } = cardTypes;

class HomeRaw extends React.Component {
  static contextType = AppContext;

  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;
    const {
      galleryAlbumId,
      login: {
        data: {
          me: { userId },
        },
      },
    } = this.context;

    const loggedIn = !!userId;

    return (
      <DataRenderer
        query={HOMEPAGE}
        variables={{ galleryAlbumId }}
        render={(data) => {
          const { album: galleryAlbum, listAlbums } = data;
          return (
            <Fragment>
              <Card title={'The mountainboarding social network'} type={STANDARD}>
                <p>Some static content</p>
                <p>Some static content</p>
              </Card>

              <AlbumPreview album={galleryAlbum} />

              {listAlbums.map((album) => (
                <AlbumPreview album={album} key={album.id} />
              ))}
            </Fragment>
          );
        }}
      />
    );
  }
}

export const Home = Translate(messages)(HomeRaw);
