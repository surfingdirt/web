import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import ErrorMessage from 'Components/Widgets/ErrorMessage';
import Spinner from 'Components/Widgets/Spinner';
import Card, { cardTypes } from 'Components/Widgets/Card';
import Translate from 'Hocs/Translate';
import FourDown2020 from 'Images/FourDown2020.png';
import { fourDownVideoRoute } from 'Utils/links';
import AppContext from '~/contexts';

import useFourDownAlbum from './useFourDownAlbum';
import EntryList from './EntryList';
import messages from './messages';
import styles from './styles.scss';

const { STANDARD } = cardTypes;

const FourDown = ({ t }) => {
  const {
    album,
    choice,
    videos,
    loading,
    error,
    onVoteClick,
    redirect,
    voteError,
    voteInProgress,
  } = useFourDownAlbum();

  const { baseUrl } = useContext(AppContext);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage />;
  if (redirect && choice) {
    const to = fourDownVideoRoute(choice);
    // Full reload because the video page does not fetch the
    window.location.href = to;
    return null;
  }
  const {
    description: { text: albumDescription },
    title: { text: albumTitle },
  } = album;

  return (
    <>
      <Helmet>
        <title>{albumTitle}</title>
        {albumDescription && <meta property="og:description" content={albumDescription} />}
        {albumDescription && <meta property="description" content={albumDescription} />}
        <meta property="og:image" content={`${baseUrl}${FourDown2020}`} />
      </Helmet>

      <Card type={STANDARD} title={albumTitle}>
        <p>{t('welcome')}</p>
        <p>{t('weAreProud')}</p>
        <p>{t('teams')}</p>

        <div className={styles.trouble}>
          {t('troubleVoting')}&nbsp;
          <a href="https://forms.gle/t8BPNNmy5EgQSXBw6" target="_blank" rel="noreferrer noopener">
            Google Form
          </a>
        </div>
      </Card>

      <EntryList
        album={album}
        media={videos}
        onVoteClick={onVoteClick}
        voteError={voteError}
        voteInProgress={voteInProgress}
      />
    </>
  );
};
FourDown.propTypes = { t: PropTypes.func.isRequired };
export default Translate(messages)(FourDown);
