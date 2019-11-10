import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Translate from 'Hocs/Translate/index';
import Comment from 'Components/Comment/Item';
import { CommentType } from 'Utils/types';

import messages from './messages';
import styles from './styles.scss';

const CommentListRaw = ({ className, comments }) => {
  if (comments.length === 0) {
    return null;
  }

  return (
    <ul className={classnames(styles.wrapper, className)}>
      {comments.map((c) => (
        <Comment comment={c} className={styles.item} key={c.id} />
      ))}
    </ul>
  );
};

CommentListRaw.propTypes = {
  className: PropTypes.string,
  comments: PropTypes.arrayOf(CommentType).isRequired,
};

CommentListRaw.defaultProps = {
  className: null,
};

export default Translate(messages)(CommentListRaw);
