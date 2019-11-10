import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import LIST_COMMENTS from 'Apollo/queries/listComments.gql';
import CommentList from 'Components/Comment/List';
import ErrorMessage from 'Components/ErrorMessage';
import Spinner from 'Components/Spinner';

import Translate from 'Hocs/Translate/index';
import messages from './messages';
import styles from './styles.scss';

const CommentListFetcherRaw = ({ className, itemId, itemType }) => {
  const { data, error, loading } = useQuery(LIST_COMMENTS, {
    variables: {
      parentType: itemType,
      parentId: itemId,
    },
  });

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <CommentList className={classnames(styles.wrapper, className)} comments={data.listComments} />
  );
};

CommentListFetcherRaw.propTypes = {
  className: PropTypes.string,
  itemId: PropTypes.string.isRequired,
  itemType: PropTypes.string.isRequired,
};

CommentListFetcherRaw.defaultProps = {
  className: null,
};

export default Translate(messages)(CommentListFetcherRaw);
