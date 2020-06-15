import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import CREATE_REACTION from 'Apollo/mutations/createReaction3.gql';
import DELETE_REACTION from 'Apollo/mutations/deleteReaction.gql';
import { DEFAULT_REACTION } from 'Components/Reactions/Reaction';

const useReactions = ({ initialReactions, itemType, itemId }) => {
  const [reactions, setReactions] = useState(initialReactions);
  const [pickerOpen, setPickerOpen] = useState(false);
  const userReactions = reactions.filter((r) => !!r.userReactionId);
  const userReactionsCount = userReactions.length;

  useEffect(() => {}, []);

  const [createReactionMutation] = useMutation(CREATE_REACTION, {});
  const [deleteReactionMutation] = useMutation(DELETE_REACTION, {});

  const insertNewReaction = ({ id, type }) => {
    const newReactions = reactions.slice();
    const existingEntryIndex = newReactions.findIndex((r) => r.type === type);
    if (typeof existingEntry !== 'undefined') {
      newReactions[existingEntryIndex].count += 1;
      newReactions[existingEntryIndex].userReactionId = id;
    } else {
      newReactions.push({
        type,
        count: 1,
        userReactionId: id,
      });
    }
    setReactions(newReactions);
  };

  const removeReaction = (id) => {
    const existingEntryIndex = userReactions.findIndex((r) => r.userReactionId === id);
    const newReactions = reactions.slice();
    if (newReactions[existingEntryIndex].count > 1) {
      // Decrement and remove user reaction id
      newReactions[existingEntryIndex].count -= 1;
      newReactions[existingEntryIndex].userReactionId = null;
    } else {
      // Remove type altogether
      newReactions.splice(existingEntryIndex, 1);
    }

    setReactions(newReactions);
  };

  const createReaction = async (type) => {
    const input = { itemType, itemId, type };
    try {
      const createResponse = await createReactionMutation({ variables: { input } });
      insertNewReaction(createResponse.data.createReaction);
    } catch (e) {
      console.error('Error while saving reaction', e, { input });
    }
  };

  const deleteReaction = async (id) => {
    try {
      const deleteResponse = await deleteReactionMutation({ variables: { id } });
      removeReaction(id);
    } catch (e) {
      console.error('Error while deleting reaction', e, { id });
    }
  };

  const onTriggerClick = async () => {
    if (userReactionsCount === 0) {
      // No reaction, create the default one
      await createReaction(DEFAULT_REACTION);
    } else if (userReactionsCount === 1 && userReactions[0].type === DEFAULT_REACTION) {
      // One reaction: the default one, remove it
      await deleteReaction(userReactions[0].userReactionId);
    } else {
      // Many reactions or a single one but not the default one. Open the picker.
      setPickerOpen(true);
    }
  };

  const onPickerChoice = async (e) => {
    setPickerOpen(false);

    const type = e.currentTarget.getAttribute('data-type');
    const thisUserReaction = userReactions.find((r) => r.type === type);

    if (thisUserReaction) {
      await deleteReaction(thisUserReaction.userReactionId);
    } else {
      await createReaction(type);
    }
  };

  return [reactions, pickerOpen, onTriggerClick, onPickerChoice];
};

export default useReactions;
