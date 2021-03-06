import { useEffect, useState, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';

import CREATE_REACTION from 'Apollo/mutations/createReaction3.gql';
import DELETE_REACTION from 'Apollo/mutations/deleteReaction.gql';
import { DEFAULT_REACTION } from 'Components/Reactions/Reaction';

const TEMP_REACTION_ID = 'tempReactionId';

const useReactions = ({ initialReactions, itemType, itemId }) => {
  const pickerRef = useRef(null);
  const triggerRef = useRef(null);
  const [reactions, setReactions] = useState(initialReactions);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    // TODO: fix this naive implementation
    //  going back and forth b/w album items always restores the initial list of reactions, meaning
    //  we always lose the new list.
    setReactions(initialReactions);
  }, [itemType, itemId]);

  console.assert(
    typeof reactions !== 'undefined',
    `Reaction hook - No reactions set for itemType ${itemType} and itemId ${itemId}`,
  );
  const userReactions = reactions.filter((r) => !!r.userReactionId);
  const userReactionsCount = userReactions.length;

  const [createReactionMutation] = useMutation(CREATE_REACTION, {});
  const [deleteReactionMutation] = useMutation(DELETE_REACTION, {});

  const insertOptimisticNewReaction = (type) => {
    const newReactions = reactions.slice();
    const existingEntryIndex = newReactions.findIndex((r) => r.type === type);
    if (existingEntryIndex !== -1) {
      newReactions[existingEntryIndex].count += 1;
      newReactions[existingEntryIndex].userReactionId = TEMP_REACTION_ID;
    } else {
      newReactions.push({
        type,
        count: 1,
        userReactionId: TEMP_REACTION_ID,
      });
    }
    setReactions(newReactions);

    return newReactions;
  };

  const updateNewReaction = (newReactions, { id }) => {
    const existingEntryIndex = newReactions.findIndex((r) => r.userReactionId === TEMP_REACTION_ID);
    // eslint-disable-next-line no-param-reassign
    newReactions[existingEntryIndex].userReactionId = id;
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
    const reactionsBackup = reactions.slice();
    const input = { itemType, itemId, type };
    try {
      const newReactions = insertOptimisticNewReaction(type);

      const createResponse = await createReactionMutation({ variables: { input } });
      updateNewReaction(newReactions, createResponse.data.createReaction);
    } catch (e) {
      console.error('Error while saving reaction', e, { input });
      setReactions(reactionsBackup);
    }
  };

  const deleteReaction = async (id) => {
    const reactionsBackup = reactions.slice();
    try {
      removeReaction(id);
      await deleteReactionMutation({ variables: { id } });
    } catch (e) {
      console.error('Error while deleting reaction', e, { id });
      setReactions(reactionsBackup);
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

  const setPickerOpenWithFocus = (open) => {
    setPickerOpen(open);
    if (open) {
      pickerRef.current.focus();
    } else {
      triggerRef.current.focus();
    }
  };
  return [
    reactions,
    triggerRef,
    pickerRef,
    pickerOpen,
    setPickerOpenWithFocus,
    onTriggerClick,
    onPickerChoice,
  ];
};

export default useReactions;
