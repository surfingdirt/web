import React from 'react';

import CommentItem from '../src/components/Comment/Item';
import SvgSymbols from '../src/components/Widgets/SvgSymbols';

const SIMPLE_COMMENT = {
  actions: [],
  id: '456',
  content: {
    locale: 'fr',
    original: true,
    text: 'This is a simple comment',
  },
  date: '2020-06-09 12:49:26.367',
  lastEditionDate: '2020-06-09 12:49:26.367',
  lastEditor: null,
  parentId: '123',
  parentType: 'photo',
  reactions: [],
  submitter: {
    userId: '0ccaad29-d95b-4221-b518-29539b39aaf9',
    username: 'Mountainboard Archives',
  },
  tone: null,
};

const COMMENT_WITH_REACTIONS = {
  actions: [],
  id: '456',
  content: {
    locale: 'fr',
    original: true,
    text: 'This is a simple comment',
  },
  date: '2020-06-09 12:49:26.367',
  lastEditionDate: '2020-06-09 12:49:26.367',
  lastEditor: null,
  parentId: '123',
  parentType: 'photo',
  reactions: [
    {
      type: 'cool',
      count: 1,
      userReactionId: null,
    },
    {
      type: 'sad',
      count: 1,
      userReactionId: null,
    },
  ],
  submitter: {
    userId: '0ccaad29-d95b-4221-b518-29539b39aaf9',
    username: 'Mountainboard Archives',
  },
  tone: null,
};

const SUPER_SHORT_WITH_REACTIONS = {
  actions: [],
  id: '456',
  content: {
    locale: 'fr',
    original: true,
    text: ':)',
  },
  date: '2020-06-09 12:49:26.367',
  lastEditionDate: '2020-06-09 12:49:26.367',
  lastEditor: null,
  parentId: '123',
  parentType: 'photo',
  reactions: [
    {
      type: 'cool',
      count: 1,
      userReactionId: null,
    },
    {
      type: 'sad',
      count: 1,
      userReactionId: null,
    },
  ],
  submitter: {
    userId: '0ccaad29-d95b-4221-b518-29539b39aaf9',
    username: 'TT',
  },
  tone: null,
};

export default {
  title: 'Comments',
};

export const SimpleComment = () => (
  <CommentItem
    comment={SIMPLE_COMMENT}
    locale="fr"
    parentId={SIMPLE_COMMENT.parentId}
    parentType={SIMPLE_COMMENT.parentType}
  />
);

SimpleComment.story = {
  name: 'Plain',
};

export const CommentWithReactions = () => (
  <>
    <SvgSymbols />
    <CommentItem
      comment={COMMENT_WITH_REACTIONS}
      locale="fr"
      parentId={COMMENT_WITH_REACTIONS.parentId}
      parentType={COMMENT_WITH_REACTIONS.parentType}
    />
  </>
);

CommentWithReactions.story = {
  name: 'With reactions',
};

export const SuperShortWithReactions = () => (
  <>
    <SvgSymbols />
    <CommentItem
      comment={SUPER_SHORT_WITH_REACTIONS}
      locale="fr"
      parentId={SUPER_SHORT_WITH_REACTIONS.parentId}
      parentType={SUPER_SHORT_WITH_REACTIONS.parentType}
    />
  </>
);

SuperShortWithReactions.story = {
  name: 'Short w/ reactions',
};
