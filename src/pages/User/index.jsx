import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import USER from 'Apollo/queries/user.gql';
import ErrorMessage from 'Components/ErrorMessage';
import Spinner from 'Components/Spinner';
import { albumRoute } from 'Utils/links';

import styles from './styles.scss';

export const User = ({ match }) => {
  const { id: userId } = match.params;

  return (
    <Query query={USER} variables={{ userId }}>
      {({ loading, error, data }) => {
        if (loading) return <Spinner />;
        if (error) return <ErrorMessage />;

        const {
          user: { username, album },
        } = data;

        const {id, title} = album;
        return (
          <div className={styles.page}>
            <p>This is the User page.</p>
            <h1>{username}</h1>
            <p>Album: <Link to={albumRoute(id)}>{title}</Link></p>
          </div>
        );
      }}
    </Query>
  );
};
