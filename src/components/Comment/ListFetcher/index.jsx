import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import LIST_COMMENTS from 'Apollo/queries/listComments.gql';
import CommentList from 'Components/Comment/List';
import ErrorMessage from 'Components/Widgets/ErrorMessage';
import Spinner from 'Components/Widgets/Spinner';

import Translate from 'Hocs/Translate/index';
import messages from './messages';
import styles from './styles.scss';

const CommentListFetcherRaw = ({ className, itemId, itemType, singleColumn }) => {
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
    <CommentList
      className={classnames(styles.wrapper, className)}
      comments={data.listComments}
      singleColumn={singleColumn}
    />
  );
};

CommentListFetcherRaw.propTypes = {
  className: PropTypes.string,
  itemId: PropTypes.string.isRequired,
  itemType: PropTypes.string.isRequired,
  singleColumn: PropTypes.bool,
};

CommentListFetcherRaw.defaultProps = {
  className: null,
  singleColumn: false,
};

export default Translate(messages)(CommentListFetcherRaw);
