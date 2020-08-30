import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';

import ALBUM_WITH_MEDIA from 'Apollo/queries/albumWithMedia.gql';
import ErrorMessage from 'Components/Widgets/ErrorMessage';
import Spinner from 'Components/Widgets/Spinner';
import Card, { cardTypes } from 'Components/Widgets/Card';
import Translate from 'Hocs/Translate';

import EntryList from './EntryList';
import messages from './messages';

const { STANDARD } = cardTypes;
const albumId = 'bf8bac1c-4a2a-42bb-a801-6d85a9ed49a3';

// The order of this list must match the order of the album items:
const hardcodedData = [
  {
    // Portugal
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSdt_HAzEy7rGlMWqa_xz-Cr-n2K_dFGepp6hrVLmxpKhFdVEQ/viewform?usp=pp_url&entry.573245380=The+Portuguese+crew's+%E2%80%9CSpirit%E2%80%9D",
    videoTitle: 'Spirit 🇵🇹',
  },
  {
    // Japan:
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSdt_HAzEy7rGlMWqa_xz-Cr-n2K_dFGepp6hrVLmxpKhFdVEQ/viewform?usp=pp_url&entry.573245380=The+Japanese+crew's+%E2%80%9CDrifters%E2%80%9D",
    videoTitle: 'Drifters 🇯🇵',
  },
  {
    // USA:
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSdt_HAzEy7rGlMWqa_xz-Cr-n2K_dFGepp6hrVLmxpKhFdVEQ/viewform?usp=pp_url&entry.573245380=The+US+crew's+%E2%80%9CSummer+Camp%E2%80%9C",
    videoTitle: 'Summer Camp 🇺🇸',
  },
  {
    // Romania:
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSdt_HAzEy7rGlMWqa_xz-Cr-n2K_dFGepp6hrVLmxpKhFdVEQ/viewform?usp=pp_url&entry.573245380=The+Romanian+crew's+%E2%80%9CThe+Cherries+On+Top+Of+The+Cake%E2%80%9C",
    videoTitle: 'The Cherries on Top of The Cake 🇷🇴',
  },
];
const FourDown = ({ t }) => {
  // TODO: create a whole bunch of components
  const { data, error, loading } = useQuery(ALBUM_WITH_MEDIA, {
    variables: { id: albumId, startItem: 0, countItems: 4 },
  });
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage />;
  const { album, listMedia } = data;
  const {
    description: { text: albumDescription },
    title: { text: albumTitle },
  } = album;
  const videos = listMedia.map((video, index) => {
    return Object.assign({}, video, hardcodedData[index]);
  });
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
