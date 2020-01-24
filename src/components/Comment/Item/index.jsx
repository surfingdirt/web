import React, { Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import LIST_COMMENTS from 'Apollo/queries/listComments3.gql';
import DELETE_COMMENT from 'Apollo/mutations/deleteComment2.gql';
import Userbox, { userboxSizes } from 'Components/User/Userbox';
import Menu from 'Components/Widgets/Menu';
import DeleteItemModal from 'Components/Widgets/DeleteItemModal';
import Translate from 'Hocs/Translate/index';
import { renderDate } from 'Utils/misc';
import { tones } from 'Utils/comments';
import icons, { getIcon } from 'Utils/icons';
import sizes from 'Utils/iconSizes';
import { CommentType } from 'Utils/types';
import { COMMENT_MENU } from '~/ids';

import messages from './messages';
import styles from './styles.scss';

const { NEUTRAL } = tones;
const { SMALL } = userboxSizes;

const CommentRaw = ({ className, comment, locale, parentId, parentType, t, tag }) => {
  const { actions, content, date, id, submitter, tone } = comment;
  const Tag = tag;
  const shouldRenderTone = tone && tone !== NEUTRAL;

  const options = [];
  if (actions.delete) {
    const variables = { id };
    const update = (cache, resultObj) => {
      const success = !!Object.values(resultObj.data);
      if (!success) {
        console.warn('Received false for comment delete', { id });
        return;
      }
      const updateVariables = {
        parentId,
        parentType,
      };

      const { listComments } = cache.readQuery({
        query: LIST_COMMENTS,
        variables: updateVariables,
      });
      cache.writeQuery({
        query: LIST_COMMENTS,
        variables: updateVariables,
        data: { listComments: listComments.filter((c) => c.id !== id) },
      });
    };

    options.push(() => (
      <DeleteItemModal
        mutation={DELETE_COMMENT}
        variables={variables}
        title={content}
        update={update}
      />
    ));
  }
  if (actions.edit) {
    // TODO: add comment edition modal
    // options.push(() => <span className={menuStyles.menuEntry}>{t('editAction')}</span>);
  }
  const showMenu = options.length > 0;

  const trigger = getIcon({
    label: t('menuLabel'),
    type: icons.ARROW_DOWN,
    size: sizes.TINY,
  });

  return (
    <Tag className={classnames(styles.wrapper, className)}>
      <Userbox size={SMALL} className={styles.user} user={submitter} renderName={false} />
      <div className={styles.content}>
        <div className={styles.metadata}>
          <div className={styles.metadataText}>
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
          {showMenu && (
            <Menu
              menuId={COMMENT_MENU}
              trigger={trigger}
              className={styles.menu}
              options={options}
            />
          )}
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
  parentId: PropTypes.string.isRequired,
  parentType: PropTypes.string.isRequired,
};

CommentRaw.defaultProps = {
  className: null,
  tag: 'li',
};

export default Translate(messages)(CommentRaw);
