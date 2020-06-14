import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import LIST_COMMENTS from 'Apollo/queries/listComments2.gql';
import DELETE_COMMENT from 'Apollo/mutations/deleteComment2.gql';
import ReactionsList from 'Components/Reactions/List';
import ReactionsTrigger from 'Components/Reactions/Trigger';
import Userbox, { userboxSizes } from 'Components/User/Userbox';
import Username from 'Components/User/Username';
import Menu from 'Components/Widgets/Menu';
import menuStyles from 'Components/Widgets/Menu/styles.scss';
import DeleteItemModal from 'Components/Widgets/DeleteItemModal';
import TranslateButton, { translateButtonTypes } from 'Components/Widgets/TranslateButton';
import Translate from 'Hocs/Translate/index';
import { renderDate } from 'Utils/misc';
import { tones } from 'Utils/comments';
import icons, { getIcon } from 'Utils/icons';
import sizes from 'Utils/iconSizes';
import { editCommentRoute } from 'Utils/links';
import { CommentType } from 'Utils/types';
import { COMMENT_MENU } from '~/ids';

import messages from './messages';
import styles from './styles.scss';

const { NEUTRAL } = tones;
const { COMMENT } = translateButtonTypes;
const { SMALL } = userboxSizes;

const CommentRaw = ({
  className,
  comment,
  locale,
  parentId,
  parentType,
  renderDate: shouldRenderDate,
  t,
  tag,
}) => {
  const {
    actions,
    content: { text: content, locale: textLocale, original },
    date,
    id,
    reactions,
    submitter,
    tone,
  } = comment;
  const Tag = tag;
  const shouldRenderTone = tone && tone !== NEUTRAL;
  // Show the button if the text is in its original form and the locale is not that of the user
  const showTranslateButton = original && textLocale !== locale;

  const options = [];
  if (actions.edit) {
    options.push(() => (
      <Link to={editCommentRoute(id)} className={menuStyles.menuEntry}>
        {t('edit')}
      </Link>
    ));
  }
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
    presentationOnly: true,
    type: icons.ARROW_DOWN,
    size: sizes.TINY,
  });

  const triggerOnReaction = () => {
    console.log('Trigger click');
  };
  const pickerOnReaction = (e) => {
    console.log(e.currentTarget.getAttribute('data-type'));
  };

  return (
    <Tag className={classnames(styles.wrapper, className)}>
      <Userbox size={SMALL} className={styles.user} user={submitter} renderName={false} />
      <div className={styles.content}>
        <div className={styles.comment}>
          <Username user={submitter} className={styles.username} hidden />
          &nbsp;
          {content}
        </div>
        <div className={styles.metadata}>
          <ul className={classnames(styles.metadataText, styles.metadataList)}>
            <li>
              <ReactionsTrigger
                parentId={parentId}
                parentType={parentType}
                reactions={reactions}
                onPickerReaction={pickerOnReaction}
                onReaction={triggerOnReaction}
                small
              />
            </li>
            {showTranslateButton && (
              <li>
                <TranslateButton
                  className={styles.metadataText}
                  type={COMMENT}
                  id={id}
                  targetLocale={locale}
                />
              </li>
            )}
            {shouldRenderTone && (
              <li>
                <span className={styles.tone}>{t(tone)}</span>
              </li>
            )}
            {shouldRenderDate && <li>{renderDate(date, locale)}</li>}
          </ul>
          {showMenu && (
            <Menu
              menuId={COMMENT_MENU}
              trigger={trigger}
              triggerClassName={styles.menuTrigger}
              triggerLabel={t('menuLabel')}
              className={styles.menu}
              options={options}
            />
          )}
          {reactions.length > 0 && (
            <ReactionsList className={styles.reactions} reactions={reactions} />
          )}
        </div>
      </div>
    </Tag>
  );
};

CommentRaw.propTypes = {
  className: PropTypes.string,
  comment: CommentType.isRequired,
  locale: PropTypes.string.isRequired,
  parentId: PropTypes.string.isRequired,
  parentType: PropTypes.string.isRequired,
  renderDate: PropTypes.bool,
  t: PropTypes.func.isRequired,
  tag: PropTypes.string,
};

CommentRaw.defaultProps = {
  className: null,
  renderDate: true,
  tag: 'li',
};

export default Translate(messages)(CommentRaw);
