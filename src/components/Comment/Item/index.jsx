import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Translate from 'Hocs/Translate/index';
import Userbox, { userboxSizes } from 'Components/User/Userbox';
import { CommentType } from 'Utils/types';

import messages from './messages';
import styles from './styles.scss';

const { SMALL } = userboxSizes;

const CommentRaw = ({ className, comment, tag }) => {
  const { content, date, submitter } = comment;

  const Tag = tag;

  return (
    <Tag className={classnames(styles.wrapper, className)}>
      <Userbox size={SMALL} className={styles.user} user={submitter} renderName={false} />
      <div className={styles.content}>
        <div className={styles.comment}>{content}</div>
        <div className={styles.metadata}>{date}</div>
      </div>
    </Tag>
  );
};

CommentRaw.propTypes = {
  className: PropTypes.string,
  comment: CommentType.isRequired,
  tag: PropTypes.string,
};

CommentRaw.defaultProps = {
  className: null,
  tag: 'li',
};

export default Translate(messages)(CommentRaw);
