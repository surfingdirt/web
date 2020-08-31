import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import ErrorMessage from 'Components/Widgets/ErrorMessage';
import Spinner from 'Components/Widgets/Spinner';
import Card, { cardTypes } from 'Components/Widgets/Card';
import Translate from 'Hocs/Translate';

import useVote from './useVote';
import useFourDownAlbum, { surveyId } from './useFourDownAlbum';
import EntryList from './EntryList';
import messages from './messages';

const { STANDARD } = cardTypes;

const FourDown = ({ t }) => {
  const [choice, voteInProgress, voteError, onVoteClick] = useVote(surveyId);
  const [album, videos, loading, error] = useFourDownAlbum();

  console.log('FourDown', { choice });

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage />;

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
      </Helmet>

      <Card type={STANDARD} title={albumTitle}>
        <p>{t('welcome')}</p>
        <p>{t('weAreProud')}</p>
        <p>{t('teams')}</p>
      </Card>

      <EntryList
        album={album}
        media={videos}
        onVoteClick={onVoteClick}
        voteInProgress={voteInProgress}
      />
    </>
  );
};
FourDown.propTypes = { t: PropTypes.func.isRequired };
export default Translate(messages)(FourDown);
