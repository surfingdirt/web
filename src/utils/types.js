import PropTypes from 'prop-types';

export const UserType = PropTypes.shape({
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
});

export const CommentType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  lastEditionDate: PropTypes.string,
  lastEditor: UserType,
  submitter: UserType.isRequired,
  tone: PropTypes.string,
});
