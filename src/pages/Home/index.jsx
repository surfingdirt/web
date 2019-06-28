/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import HOMEPAGE from 'Apollo/queries/home.gql';
import Card from 'Components/Card';
import DataRenderer from 'Components/DataRenderer';
import Translate from 'Hocs/Translate';
import { albumRoute } from 'Utils/links';
import AppContext from '~/contexts';

import messages from './messages';

class HomeRaw extends React.Component {
  static contextType = AppContext;

  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;
    const { galleryAlbumId } = this.context;

    return (
      <DataRenderer
        query={HOMEPAGE}
        variables={{ albumId: galleryAlbumId }}
        render={(data) => {
          const {
            album: { id, title, description },
          } = data;
          return (
            <Card title={title} type="main">
              <Link to={albumRoute(id)}>
                <span>{description}</span>
              </Link>
            </Card>
          );
        }}
      />
    );
  }
}

export const Home = Translate(messages)(HomeRaw);
