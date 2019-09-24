/* eslint-disable import/prefer-default-export */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';

import USER_PROFILE from 'Apollo/queries/user.gql';
import AlbumPreview from 'Components/Album/AlbumPreview';
import Button, { buttonSizes, buttonTypes } from 'Components/Button';
import Cover from 'Components/Cover';
import Card, { cardTypes } from 'Components/Card';
import DualContainer from 'Components/DualContainer/index';
import ErrorMessage from 'Components/ErrorMessage';
import Heading, { headingTypes } from 'Components/Heading/index';
import Paragraph from 'Components/Paragraph';
import Spinner from 'Components/Spinner';
import BioUpdateForm from 'Components/User/BioUpdate/Form';
import Translate from 'Hocs/Translate';
import WithModal from 'Hocs/WithModal';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { BARE } = cardTypes;
const { PRIMARY } = headingTypes;
const { SMALL } = buttonSizes;
const { NEGATIVE } = buttonTypes;

const MIN_DROPCAP_LENGTH = 200;

// TODO: dedupe code between this and pages/User/index.jsx

class ProfileRaw extends React.Component {
  static contextType = AppContext;

  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  renderBio(bio) {
    const { t } = this.props;
    const {
      login: {
        data: {
          me: { userId },
        },
      },
    } = this.context;

    const emptyBio = !bio;
    const text = emptyBio ? t('emptyBio') : bio;

    const ModalButton = WithModal({
      modalContent: <BioUpdateForm userId={userId} bio={bio} />,
      modalTitle: t('updateUserBio'),
      ariaLabel: t('updateUserBioDialogLabel'),
    })(
      <div>
        <Button label={bio ? t('update') : t('add')} size={SMALL} type={NEGATIVE} />
      </div>,
    );

    return (
      <DualContainer>
        <Paragraph
          withDropCap={bio && bio.length > MIN_DROPCAP_LENGTH}
          withAutoLink
          className={classnames(styles.bio, { [styles.emptyBio]: emptyBio })}
          ugc
        >
          {text}
        </Paragraph>
        <ModalButton />
      </DualContainer>
    );
  }

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
              <Helmet>
                <title>{t('profile')}</title>
              </Helmet>

              <Card type={BARE}>
                <Cover cover={cover} avatar={avatar} username={username} withUpdateForms />
                <div className={styles.contentWrapper}>
                  <Heading className={styles.username} type={PRIMARY}>
                    {username}
                  </Heading>

                  {this.renderBio(bio)}
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
