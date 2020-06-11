import React from 'react';

import CommentItem from '../src/components/Comment/Item';

const SIMPLE_COMMENT = {
  actions: [],
  id: '456',
  content: {
    locale: 'en',
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

export default {
  title: 'Comments',
};

export const SimpleComment = () => (
  <CommentItem
    comment={SIMPLE_COMMENT}
    locale="en"
    parentId={SIMPLE_COMMENT.parentId}
    parentType={SIMPLE_COMMENT.parentType}
  />
);

SimpleComment.story = {
  name: 'Simple comment',
};
