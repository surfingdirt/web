import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import VOTE from 'Apollo/mutations/castVote.gql';
import FOUR_DOWN from 'Apollo/queries/fourDown.gql';

const albumId = 'bf8bac1c-4a2a-42bb-a801-6d85a9ed49a3';

export const surveyId = '1f78dda7-789f-472b-b7e1-0bacfe3ece39';

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
function buildAlbumAndVideos(data, newChoice) {
  let album = null;
  let videos = null;
  if (data) {
    let { choice } = data.getSurveyVote;
    if (newChoice) {
      // The user made a new choice that we did not know about last time we queried getSurveyVote
      choice = newChoice;
    }
    // eslint-disable-next-line prefer-destructuring
    album = data.album;
    videos = data.listMedia.map((video, i) => {
      const selected = choice === video.id;
      return Object.assign({}, video, hardcodedData[i], { selected });
    });
  }
  return [album, videos];
}
const useFourDownAlbum = () => {
  const [redirect, setRedirect] = useState(null);
  const [choice, setChoice] = useState(null);
  const [voteInProgress, setVoteInProgress] = useState(null);
  const [voteError, setVoteError] = useState(null);
  const [voteMutation] = useMutation(VOTE, {});
  const { data, error, loading } = useQuery(FOUR_DOWN, {
    variables: { id: albumId, startItem: 0, countItems: 4, surveyId },
  });
  useEffect(() => {
    if (data && data.getSurveyVote) {
      setChoice(data.getSurveyVote.choice);
    }
  }, [data]);
  const [album, videos] = buildAlbumAndVideos(data, choice);
  const onVoteClick = async (newChoice) => {
    setVoteInProgress(newChoice);
    const newValue = newChoice === choice ? null : newChoice; // If we click the same button again, remove the vote
    try {
      await voteMutation({ variables: { input: { surveyId, choice: newValue } } });
      setChoice(newValue);
      setVoteInProgress(null);
      setTimeout(() => {
        if (newValue) {
          setRedirect(newValue);
        }
      }, 1000);
    } catch (e) {
      setVoteError(newChoice);
      setVoteInProgress(null);
    }
  };
  return {
    album,
    choice,
    videos,
    loading,
    error,
    onVoteClick,
    redirect,
    voteError,
    voteInProgress,
  };
};
export default useFourDownAlbum;
