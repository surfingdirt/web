import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import ErrorMessage from 'Components/ErrorMessage';
import Spinner from 'Components/Spinner';

import styles from './styles.scss';

const DataRenderer = ({ query, variables, render }) => {
  return (
    <Query query={query} variables={variables}>
      {({ loading, error, data }) => {
        if (loading) return <Spinner negative className={styles.spinner} />;
        if (error) return <ErrorMessage />;

        return render(data);
      }}
    </Query>
  );
};

DataRenderer.propTypes = {
  query: PropTypes.objectOf(PropTypes.any).isRequired,
  variables: PropTypes.objectOf(PropTypes.any),
  render: PropTypes.func.isRequired,
};

DataRenderer.defaultProps = {
  variables: {},
};

export default DataRenderer;
