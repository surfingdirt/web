import React from 'react';

import CommentItem from '../src/components/Comment/Item';
import CommentList from '../src/components/Comment/List';

const PARENT_TYPE = 'photo';
const PARENT_ID = '123';

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
  parentId: PARENT_ID,
  parentType: PARENT_TYPE,
  reactions: [],
  submitter: {
    userId: '0ccaad29-d95b-4221-b518-29539b39aaf9',
    username: 'Some User',
  },
  tone: null,
};

const SIMPLE_COMMENT_LIKE = {
  actions: [],
  id: '123',
  content: {
    locale: 'fr',
    original: true,
    text: 'This is a simple comment with a user like',
  },
  date: '2020-06-09 12:49:26.367',
  lastEditionDate: '2020-06-09 12:49:26.367',
  lastEditor: null,
  parentId: PARENT_ID,
  parentType: PARENT_TYPE,
  reactions: [
    {
      type: 'like',
      count: 1,
      userReactionId: '123456',
    },
    {
      type: 'angry',
      count: 1,
      userReactionId: null,
    },
    {
      type: 'injured',
      count: 1,
      userReactionId: null,
    },
  ],
  submitter: {
    userId: '0ccaad29-d95b-4221-b518-29539b39aaf9',
    username: 'Bobby',
  },
  tone: null,
};

const COMMENT_WITH_REACTIONS = {
  actions: [],
  id: '789',
  content: {
    locale: 'fr',
    original: true,
    text: 'This is a simple comment',
  },
  date: '2020-06-09 12:49:26.367',
  lastEditionDate: '2020-06-09 12:49:26.367',
  lastEditor: null,
  parentId: PARENT_ID,
  parentType: PARENT_TYPE,
  reactions: [
    {
      type: 'cool',
      count: 1,
      userReactionId: null,
    },
    {
      type: 'sad',
      count: 1,
      userReactionId: '456789',
    },
    {
      type: 'impressed',
      count: 1,
      userReactionId: '456789',
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
  id: 'abc',
  content: {
    locale: 'fr',
    original: true,
    text: ':)',
  },
  date: '2020-06-09 12:49:26.367',
  lastEditionDate: '2020-06-09 12:49:26.367',
  lastEditor: null,
  parentId: PARENT_ID,
  parentType: PARENT_TYPE,
  reactions: [
    {
      type: 'cool',
      count: 1,
      userReactionId: 'dfdf',
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

const COMMENT_LIST = [
  SIMPLE_COMMENT,
  SIMPLE_COMMENT_LIKE,
  COMMENT_WITH_REACTIONS,
  SUPER_SHORT_WITH_REACTIONS,
];

export default {
  title: 'Comments',
};

export const Plain = () => <CommentItem comment={SIMPLE_COMMENT} locale="fr" />;

export const WithReactions = () => <CommentItem comment={COMMENT_WITH_REACTIONS} locale="fr" />;

export const ShortWithReactions = () => (
  <CommentItem comment={SUPER_SHORT_WITH_REACTIONS} locale="fr" />
);

export const List = () => (
  <CommentList id="comment-list" comments={COMMENT_LIST} renderDate type="photo" showCommentForm />
);

export const ListWithoutDates = () => (
  <CommentList
    id="comment-list"
    comments={COMMENT_LIST}
    renderDate={false}
    type="photo"
    showCommentForm
  />
);
