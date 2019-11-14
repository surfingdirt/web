import React, { Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Userbox, { userboxSizes } from 'Components/User/Userbox';
import Translate from 'Hocs/Translate/index';
import { renderDate } from 'Utils/misc';
import { tones } from 'Utils/comments';
import { CommentType } from 'Utils/types';

import messages from './messages';
import styles from './styles.scss';

const { SMALL } = userboxSizes;
const { NEUTRAL } = tones;

const CommentRaw = ({ className, comment, locale, t, tag }) => {
  const { content, date, submitter, tone } = comment;
  const Tag = tag;
  const shouldRenderTone = tone && tone !== NEUTRAL;

  return (
    <Tag className={classnames(styles.wrapper, className)}>
      <Userbox size={SMALL} className={styles.user} user={submitter} renderName={false} />
      <div className={styles.content}>
        <div className={styles.metadata}>
          {shouldRenderTone && (
            <Fragment>
              <span className={styles.tone}>{t(tone)}</span>
              <span aria-hidden className={styles.separator}>
                &bull;
              </span>
            </Fragment>
          )}
          {renderDate(date, locale)}
        </div>
        <div className={styles.comment}>{content}</div>
      </div>
    </Tag>
  );
};

CommentRaw.propTypes = {
  className: PropTypes.string,
  comment: CommentType.isRequired,
  locale: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  tag: PropTypes.string,
};

CommentRaw.defaultProps = {
  className: null,
  tag: 'li',
};

export default Translate(messages)(CommentRaw);
