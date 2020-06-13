import React from 'react';

import ReactionsList from '../src/components/Reactions/List';
import { DEFAULT_REACTION } from '../src/components/Reactions/Reaction';
import ReactionsPicker from '../src/components/Reactions/Picker';
import ReactionsTrigger from '../src/components/Reactions/Trigger';

export default {
  title: 'Reactions',
};

const triggerOnReaction = (e) => {
  console.log('Trigger click');
};
const pickerOnReaction = (e) => {
  console.log(e.currentTarget.getAttribute('data-type'));
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
const triggerParentType = 'comment';
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
  MULTIPLE: [
    {
      type: 'like',
      count: 1,
      userReactionId: '123',
    },
    {
      type: 'fire',
      count: 1,
      userReactionId: '456',
    },
    {
      type: 'injured',
      count: 1,
      userReactionId: '789',
    },
  ],
  MULTIPLE_ELLIPSIS: [
    {
      type: 'like',
      count: 1,
      userReactionId: '123',
    },
    {
      type: 'fire',
      count: 1,
      userReactionId: '456',
    },
    {
      type: 'injured',
      count: 1,
      userReactionId: '789',
    },
    {
      type: 'impressed',
      count: 1,
      userReactionId: 'abc',
    },
    {
      type: 'cool',
      count: 1,
      userReactionId: 'def',
    },
  ],
};

export const Trigger = () => (
  <div style={{ display: 'grid', gap: '20px', margin: '20px' }}>
    <ReactionsTrigger
      parentId="123"
      parentType={triggerParentType}
      reactions={triggerData.SINGLE_NO_OWNER}
      onPickerReaction={pickerOnReaction}
      onReaction={triggerOnReaction}
    />
    <ReactionsTrigger
      parentId="456"
      parentType={triggerParentType}
      reactions={triggerData.SINGLE_OWNER_DEFAULT}
      onPickerReaction={pickerOnReaction}
      onReaction={triggerOnReaction}
    />
    <ReactionsTrigger
      parentId="789"
      parentType={triggerParentType}
      reactions={triggerData.SINGLE_FIRE}
      onPickerReaction={pickerOnReaction}
      onReaction={triggerOnReaction}
    />
    <ReactionsTrigger
      parentId="abc"
      parentType={triggerParentType}
      reactions={triggerData.MULTIPLE}
      onPickerReaction={pickerOnReaction}
      onReaction={triggerOnReaction}
    />
    <ReactionsTrigger
      parentId="def"
      parentType={triggerParentType}
      reactions={triggerData.MULTIPLE_ELLIPSIS}
      onPickerReaction={pickerOnReaction}
      onReaction={triggerOnReaction}
    />
  </div>
);

/* ReactionsPicker */
const PickerData = {
  SINGLE_FIRE: [
    {
      type: 'fire',
      count: 1,
      userReactionId: '123',
    },
  ],
};
export const Picker = () => (
  <ReactionsPicker onReaction={pickerOnReaction} reactions={PickerData.SINGLE_FIRE} />
);
