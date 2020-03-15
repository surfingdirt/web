import React from 'react';
import PropTypes from 'prop-types';

import COMMENT from 'Apollo/queries/comment.gql';
import Card, { cardTypes } from 'Components/Widgets/Card';
import DataRenderer from 'Components/Widgets/DataRenderer';
import CommentEditForm from 'Components/Comment/EditForm';
import Translate from 'Hocs/Translate';

import messages from './messages';
import styles from './styles.scss';

const { STANDARD } = cardTypes;

const CommentEdit = (props) => {
  const { match, t } = props;
  const { id } = match.params;

  return (
    <DataRenderer
      query={COMMENT}
      variables={{ id }}
      render={(data) => {
        const { comment } = data;

        return (
          <Card title={t('commentEditPage')} type={STANDARD} className={styles.page}>
            <CommentEditForm comment={comment} />
          </Card>
        );
      }}
    />
  );
};

CommentEdit.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(CommentEdit);
