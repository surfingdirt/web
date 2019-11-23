import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Translate from 'Hocs/Translate/index';
import CommentForm from 'Components/Comment/Form';
import Comment from 'Components/Comment/Item';
import { CommentType } from 'Utils/types';

import messages from './messages';
import styles from './styles.scss';

const CommentListRaw = ({ className, comments, id, singleColumn, type }) => {
  const twoColumns = !singleColumn;

  return (
    <div className={classnames(styles.wrapper, { [styles.twoColumns]: twoColumns })}>
      <ul className={classnames(styles.list, className)}>
        {comments.map((c) => (
          <Comment comment={c} className={styles.item} key={c.id} parentType={type} parentId={id} />
        ))}
      </ul>
      <CommentForm type={type} id={id} className={classnames(styles.postForm, className)} />
    </div>
  );
};

CommentListRaw.propTypes = {
  className: PropTypes.string,
  comments: PropTypes.arrayOf(CommentType).isRequired,
  id: PropTypes.string.isRequired,
  singleColumn: PropTypes.bool,
  type: PropTypes.string.isRequired,
};

CommentListRaw.defaultProps = {
  className: null,
  singleColumn: false,
};

export default Translate(messages)(CommentListRaw);
