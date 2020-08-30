import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import ErrorMessage from 'Components/Widgets/ErrorMessage';
import Spinner from 'Components/Widgets/Spinner';
import Card, { cardTypes } from 'Components/Widgets/Card';
import Translate from 'Hocs/Translate';

import useFourDownAlbum from './useFourDownAlbum';
import EntryList from './EntryList';
import messages from './messages';

const { STANDARD } = cardTypes;

const FourDown = ({ t }) => {
  const [album, videos, loading, error] = useFourDownAlbum();

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

      <EntryList album={album} media={videos} />
    </>
  );
};
FourDown.propTypes = { t: PropTypes.func.isRequired };
export default Translate(messages)(FourDown);
