import { useState, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import VOTE from 'Apollo/mutations/castVote.gql';

const useVote = (surveyId) => {
  const [choice, setChoice] = useState(null);
  const [voteInProgress, setVoteInProgress] = useState(null);
  const [error, setError] = useState(null);

  const [voteMutation] = useMutation(VOTE, {});

  const onVoteClick = async (newChoice) => {
    console.log('onVoteClick', newChoice);
    setVoteInProgress(newChoice);

    setTimeout(() => {
      console.log('setting choice');
      setChoice(newChoice);
      setVoteInProgress(null);
    }, 2500);
    // const results = await voteMutation({ input: { surveyId, choice } });
  };

  return [choice, voteInProgress, error, onVoteClick];
};

export default useVote;
