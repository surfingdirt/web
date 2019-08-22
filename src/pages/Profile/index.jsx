/* eslint-disable import/prefer-default-export */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import USER_PROFILE from 'Apollo/queries/user2.gql';
import AlbumPreview from 'Components/Album/AlbumPreview';
import Cover from 'Components/Cover';
import Card, { cardTypes } from 'Components/Card';
import ErrorMessage from 'Components/ErrorMessage';
import Heading, { headingTypes } from 'Components/Heading/index';
import Paragraph from 'Components/Paragraph';
import Spinner from 'Components/Spinner';
import Translate from 'Hocs/Translate';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { BARE } = cardTypes;
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

    return (
      <Query query={USER_PROFILE} variables={{ userId }}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner />;
          if (error) return <ErrorMessage />;

          const {
            user: { avatar, bio, cover },
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
                  {bio && <Paragraph widthDropCap className={styles.bio}>{bio}</Paragraph>}
                </div>
              </Card>

              {listAlbums.map((album) => (
                <AlbumPreview album={album} key={album.id} renderIfEmpty />
              ))}
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export const Profile = Translate(messages)(ProfileRaw);
