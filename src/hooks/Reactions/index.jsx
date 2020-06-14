import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import CREATE_REACTION from 'Apollo/mutations/createReaction3.gql';
import { DEFAULT_REACTION } from 'Components/Reactions/Reaction';

const useReactions = ({ initialReactions, itemType, itemId }) => {
  const [reactions, setReactions] = useState(initialReactions);
  const userReactions = reactions.filter((r) => !!r.userReactionId);

  useEffect(() => {}, []);

  const [createReaction] = useMutation(CREATE_REACTION, {});

  const performReactionCreation = (type) => {
    const input = { itemType, itemId, type };
    return createReaction({ variables: { input } });
  };

  const onTriggerClick = async () => {
    console.log('onTriggerClick', 'current user reactions:', userReactions.length);
    // TODO: act differently depending on userReactions.length and on whether the reaction exists

    const result = await performReactionCreation(DEFAULT_REACTION);
    console.log('Default reaction creation response', result);
  };
  const onPickerChoice = async (e) => {
    const reactionType = e.currentTarget.getAttribute('data-type');

    // TODO: act differently depending on whether the reaction exists
    const result = await performReactionCreation(reactionType);
    console.log('Default reaction creation response', result);
  };

  return [reactions, onTriggerClick, onPickerChoice];
};

export default useReactions;
