import React, { useContext } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Translate from 'Hocs/Translate/index';
import CommentForm from 'Components/Comment/Form';
import Comment from 'Components/Comment/Item';
import { CommentType } from 'Utils/types';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const CommentListRaw = ({
  className,
  comments,
  id,
  refetch,
  renderDate,
  showCommentForm,
  singleColumn,
  type,
}) => {
  const { login } = useContext(AppContext);
  const loggedIn = !!login.data.accessToken;

  const twoColumns = !singleColumn;

  return (
    <div className={classnames(styles.wrapper, { [styles.twoColumns]: twoColumns })}>
      <ul className={classnames(styles.list, className)}>
        {comments.map((c) => (
          <Comment
            comment={c}
            className={styles.item}
            key={c.id}
            parentType={type}
            parentId={id}
            renderDate={renderDate}
          />
        ))}
      </ul>
      {showCommentForm && loggedIn && (
        <CommentForm
          type={type}
          id={id}
          className={classnames(styles.postForm, className)}
          refetch={refetch}
        />
      )}
    </div>
  );
};

CommentListRaw.propTypes = {
  className: PropTypes.string,
  comments: PropTypes.arrayOf(CommentType).isRequired,
  id: PropTypes.string.isRequired,
  refetch: PropTypes.func,
  renderDate: PropTypes.bool,
  showCommentForm: PropTypes.bool,
  singleColumn: PropTypes.bool,
  type: PropTypes.string.isRequired,
};

CommentListRaw.defaultProps = {
  className: null,
  refetch: () => {},
  renderDate: true,
  showCommentForm: true,
  singleColumn: false,
};

export default Translate(messages)(CommentListRaw);
