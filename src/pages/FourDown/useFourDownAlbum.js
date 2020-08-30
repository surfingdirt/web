import { useQuery } from '@apollo/react-hooks';

import FOUR_DOWN from 'Apollo/queries/fourDown.gql';

// const albumId = 'bf8bac1c-4a2a-42bb-a801-6d85a9ed49a3';
const albumId = 'ce7573d5-fea4-4902-8ce1-04fa4e6a2401';

const surveyId = '1f78dda7-789f-472b-b7e1-0bacfe3ece39';

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
const useFourDownAlbum = () => {
  const { data, error, loading } = useQuery(FOUR_DOWN, {
    variables: { id: albumId, startItem: 0, countItems: 4, surveyId },
  });
  let album = null;
  let videos = null;
  let vote = null;
  if (data) {
    // eslint-disable-next-line prefer-destructuring
    album = data.album;
    vote = data.getSurveyVote;
    videos = data.listMedia.map((video, i) => {
      const selected = vote.choice === video.id;
      return Object.assign({}, video, hardcodedData[i], { selected });
    });
  } // console.log('useFourDownAlbum', { vote, videos });
  return [album, videos, vote, loading, error];
};
export default useFourDownAlbum;
