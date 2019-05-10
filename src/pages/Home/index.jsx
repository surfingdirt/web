/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import HOMEPAGE from 'Apollo/queries/homepageVideo.gql';
import ErrorMessage from 'Components/ErrorMessage';
import Spinner from 'Components/Spinner';
import Translate from 'Hocs/Translate';
import { videoRoute } from 'Utils/links';

import messages from './messages';

const Index = ({ t }) => {
  return (
    <Query query={HOMEPAGE}>
      {({ loading, error, data }) => {
        if (loading) return <Spinner />;
        if (error) return <ErrorMessage />;

        const {
          video: { id, title },
        } = data;
        return (
          <div>
            <Link to={videoRoute(id)}>Video page: {title}</Link>
          </div>
        );
      }}
    </Query>
  );
};

Index.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,
};

export const Home = Translate(messages)(Index);
