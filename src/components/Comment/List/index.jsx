import React, { Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Translate from 'Hocs/Translate/index';
import CommentForm from 'Components/Comment/Form';
import Comment from 'Components/Comment/Item';
import { CommentType } from 'Utils/types';

import messages from './messages';
import styles from './styles.scss';

const CommentListRaw = ({ className, comments, id, type }) => {
  if (comments.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <ul className={classnames(styles.list, className)}>
        {comments.map((c) => (
          <Comment comment={c} className={styles.item} key={c.id} />
        ))}
      </ul>
      <CommentForm type={type} id={id} className={styles.postForm} />
    </div>
  );
};

CommentListRaw.propTypes = {
  className: PropTypes.string,
  comments: PropTypes.arrayOf(CommentType).isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

CommentListRaw.defaultProps = {
  className: null,
};

export default Translate(messages)(CommentListRaw);
