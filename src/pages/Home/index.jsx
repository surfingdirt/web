/* eslint-disable import/prefer-default-export */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import HOMEPAGE from 'Apollo/queries/home.gql';
import AlbumPreview from 'Components/AlbumPreview';
import Card, { cardTypes } from 'Components/Card';
import Paragraph from 'Components/Paragraph';
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
              <Card title="The mountainboarding social network" type={STANDARD}>
                <Paragraph widthDropCap>
                  Welcome to Surfing Dirt! Ipsa ad commodi occaecati earum quas. Alias et quasi quos
                  autem. Earum autem impedit sunt tenetur quod omnis. Molestias vel qui et ad culpa
                  est qui. Ut ea numquam quod doloribus. Provident aliquid repudiandae porro velit
                  libero expedita velit unde.
                </Paragraph>
                <Paragraph>
                  Sapiente cumque maiores commodi id veritatis fugiat. Impedit blanditiis ea esse
                  dolores mollitia ipsa voluptate atque. Harum et quos similique in sit.
                </Paragraph>
                <Paragraph>
                  Blanditiis vero modi aut facilis amet pariatur cumque optio. Numquam in
                  perferendis inventore doloremque. Nemo est inventore qui sunt iure unde.
                </Paragraph>
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
