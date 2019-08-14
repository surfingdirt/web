/* eslint-disable import/prefer-default-export */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Query } from 'react-apollo';

import USER_PROFILE from 'Apollo/queries/user4.gql';
import AlbumPreview from 'Components/AlbumPreview';
import Cover from 'Components/Cover';
import Card, { cardTypes } from 'Components/Card';
import ErrorMessage from 'Components/ErrorMessage';
import Heading, { headingTypes } from 'Components/Heading/index';
import Spinner from 'Components/Spinner';
import Translate from 'Hocs/Translate';
import { albumRoute } from 'Utils/links';
import AppContext from '~/contexts';
import routes from '~/routes';

import messages from './messages';
import styles from './styles.scss';

const { HOME } = routes;

const { BARE, STANDARD } = cardTypes;
const { PRIMARY } = headingTypes;

class ProfileRaw extends React.Component {
  static contextType = AppContext;

  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;

    const {
      login: {
        data: {
          me: { username, userId },
        },
      },
    } = this.context;

    const isLoggedIn = !!username;
    if (!isLoggedIn) {
      return <Redirect to={HOME} />;
    }

    return (
      <Query query={USER_PROFILE} variables={{ userId }}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner />;
          if (error) return <ErrorMessage />;

          const {
            user: { avatar, cover },
            listAlbums,
          } = data;

          return (
            <Fragment>
              <Card type={BARE}>
                <Cover cover={cover} avatar={avatar} withUpdateForms />
                <div className={styles.contentWrapper}>
                  <Heading className={styles.username} type={PRIMARY}>
                    {username}
                  </Heading>
                </div>
              </Card>

              {listAlbums.map((album) => (
                <Card
                  className={styles.albumCard}
                  key={album.id}
                  title={album.title}
                  titleLink={albumRoute(album.id)}
                  type={STANDARD}
                >
                  <AlbumPreview album={album} />
                </Card>
              ))}
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export const Profile = Translate(messages)(ProfileRaw);
