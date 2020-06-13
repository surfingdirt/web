import React from 'react';

import ReactionsList, { DEFAULT_REACTION } from '../src/components/Reactions/List';
import ReactionsPicker from '../src/components/Reactions/Picker';
import ReactionsTrigger from '../src/components/Reactions/Trigger';

export default {
  title: 'Reactions',
};

/* ReactionsList */
const listData = {
  SINGLE: [
    {
      type: 'fire',
      count: 1,
      userReactionId: null,
    },
  ],
  MULTIPLE: [
    {
      type: 'angry',
      count: 1,
      userReactionId: null,
    },
    {
      type: 'impressed',
      count: 1,
      userReactionId: null,
    },
    {
      type: 'like',
      count: 5,
      userReactionId: null,
    },
  ],
};

export const ListSingle = () => <ReactionsList reactions={listData.SINGLE} />;
export const ListMultiple = () => <ReactionsList reactions={listData.MULTIPLE} />;

/* ReactionsTrigger */
const triggerOnReaction = console.log;
const triggerData = {
  SINGLE_NO_OWNER: [
    {
      type: 'fire',
      count: 1,
      userReactionId: null,
    },
  ],
  SINGLE_OWNER_DEFAULT: [
    {
      type: DEFAULT_REACTION,
      count: 1,
      userReactionId: '123',
    },
  ],
  SINGLE_FIRE: [
    {
      type: 'fire',
      count: 1,
      userReactionId: '123',
    },
  ],
};

export const TriggerInactive = () => (
  <ReactionsTrigger reactions={triggerData.SINGLE_NO_OWNER} onReaction={triggerOnReaction} />
);
export const TriggerActiveDefault = () => (
  <ReactionsTrigger reactions={triggerData.SINGLE_OWNER_DEFAULT} onReaction={triggerOnReaction} />
);
export const TriggerActiveFire = () => (
  <ReactionsTrigger reactions={triggerData.SINGLE_FIRE} onReaction={triggerOnReaction} />
);

/* ReactionsPicker */
const onReactionPicker = (e) => {
  console.log(e.currentTarget.getAttribute('data-type'));
};
export const Picker = () => <ReactionsPicker onReaction={onReactionPicker} />;
