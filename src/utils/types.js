import PropTypes from 'prop-types';

export const UserType = PropTypes.shape({
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
});

export const ActionType = PropTypes.shape({
  add: PropTypes.bool,
  delete: PropTypes.bool,
  edit: PropTypes.bool,
});

export const TranslatedTextType = PropTypes.shape({
  locale: PropTypes.string,
  original: PropTypes.bool,
  text: PropTypes.string,
});

export const CommentType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  content: TranslatedTextType.isRequired,
  date: PropTypes.string.isRequired,
  lastEditionDate: PropTypes.string,
  lastEditor: UserType,
  parentId: PropTypes.string.isRequired,
  parentType: PropTypes.string.isRequired,
  submitter: UserType.isRequired,
  tone: PropTypes.string,
});

export const MediaType = PropTypes.shape({
  id: PropTypes.string.isRequired,
});

export const AlbumType = PropTypes.shape({
  id: PropTypes.string.isRequired,
});
