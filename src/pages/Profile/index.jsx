/* eslint-disable import/prefer-default-export */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet-async';
import classnames from 'classnames';

import USER_AND_ALBUMS from 'Apollo/queries/userAndAlbums2.gql';
import AlbumPreview from 'Components/Album/AlbumPreview';
import Button, { buttonSizes, buttonTypes } from 'Components/Widgets/Button';
import Cover from 'Components/Cover';
import Card, { cardTypes } from 'Components/Widgets/Card';
import DualContainer from 'Components/Widgets/DualContainer/index';
import ErrorMessage from 'Components/Widgets/ErrorMessage';
import Heading, { headingTypes } from 'Components/Widgets/Heading/index';
import { modalTypes } from 'Components/Widgets/Modal';
import Paragraph from 'Components/Widgets/Paragraph';
import Spinner from 'Components/Widgets/Spinner';
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
const { STANDARD } = modalTypes;

const MIN_DROPCAP_LENGTH = 200;

// TODO: dedupe code between this and pages/User/index.jsx

class Profile extends React.Component {
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

    const emptyBio = !bio.text;
    const text = emptyBio ? t('emptyBio') : bio.text;
    const withDropCap = !emptyBio && bio.text.length > MIN_DROPCAP_LENGTH;

    const ModalButton = WithModal({
      ariaLabel: t('updateUserBioDialogLabel'),
      modalContent: <BioUpdateForm userId={userId} bio={bio} />,
      modalTitle: t('updateUserBio'),
      type: STANDARD,
    })(
      <div>
        <Button label={bio.text ? t('update') : t('add')} size={SMALL} type={NEGATIVE} />
      </div>,
    );

    return (
      <DualContainer>
        <Paragraph
          withDropCap={withDropCap}
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
      <Query query={USER_AND_ALBUMS} variables={{ userId }}>
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

export default Translate(messages)(Profile);
