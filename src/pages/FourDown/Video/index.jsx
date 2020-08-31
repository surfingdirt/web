import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import Card, { cardTypes } from 'Components/Widgets/Card';
import ErrorMessage from 'Components/Widgets/ErrorMessage';
import Spinner from 'Components/Widgets/Spinner';
import Translate from 'Hocs/Translate';
import { getBiggestMediaImageUrl } from 'Utils/media';

import useVote from '../useVote';
import useFourDownAlbum, { surveyId } from '../useFourDownAlbum';
import EntryItem from '../EntryList/EntryItem';
import messages from '../messages';
import styles from './styles.scss';

const { STANDARD } = cardTypes;

const FourDownVideo = ({ match, t }) => {
  const { id } = match.params;

  const [choice, voteInProgress, voteError, onVoteClick] = useVote(surveyId);
  const [album, videos, loading, error] = useFourDownAlbum();

  console.log('FourDownVideo', { choice });

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage />;

  const hasVoted = videos.some(({ selected }) => !!selected);
  const item = videos.find((video) => video.id === id);
  const {
    description: { text: description },
    title: { text: title },
  } = item;
  const image = getBiggestMediaImageUrl(item);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        {description && <meta property="og:description" content={description} />}
        {description && <meta property="description" content={description} />}
        {image && <meta property="og:image" content={image} />}
      </Helmet>

      <Card type={STANDARD} title={t('votePage')} className={styles.top}>
        <p>{t('voteForThisVideo')}</p>
      </Card>

      <EntryItem hasVoted={hasVoted} item={item} onVoteClick={onVoteClick} />
    </>
  );
};

FourDownVideo.propTypes = { t: PropTypes.func.isRequired };

export default Translate(messages)(FourDownVideo);
