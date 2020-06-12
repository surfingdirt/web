import React from 'react';

import SvgSymbols from '../src/components/Widgets/SvgSymbols';
import ReactionsList from '../src/components/Reactions/List';
import ReactionsPicker from '../src/components/Reactions/Picker';
import ReactionsTrigger from '../src/components/Reactions/Trigger';

const SINGLE_REACTION = [
  {
    type: 'fire',
    count: 1,
    userReactionId: null,
  },
];

const MULTIPLE_REACTIONS = [
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
];

const SINGLE_FIRE_REACTION_OWNER = [
  {
    type: 'fire',
    count: 1,
    userReactionId: '123',
  },
];

export default {
  title: 'Reactions',
};

export const ReactionsListSingle = () => (
  <>
    <SvgSymbols />
    <ReactionsList reactions={SINGLE_REACTION} />
  </>
);

ReactionsListSingle.story = {
  name: 'Single',
};

export const ReactionsListMultiple = () => (
  <>
    <SvgSymbols />
    <ReactionsList reactions={MULTIPLE_REACTIONS} />
  </>
);

ReactionsListMultiple.story = {
  name: 'Multiple',
};

export const ReactionsTriggerInactive = () => (
  <>
    <SvgSymbols />
    <ReactionsTrigger />
  </>
);
ReactionsTriggerInactive.story = {
  name: 'Inactive',
};
