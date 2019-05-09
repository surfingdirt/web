/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';

import HOMEPAGE from 'Apollo/queries/homepageVideo.gql';
import ErrorMessage from 'Components/ErrorMessage';
import Spinner from 'Components/Spinner';
import Translate from 'Hocs/Translate';

import messages from './messages';

const Index = ({ t }) => {
  return (
    <Query query={HOMEPAGE}>
      {({ loading, error, data }) => {
        if (loading) return <Spinner />;
        if (error) return <ErrorMessage />;

        const {
          video: { title, thumbs, vendorUrl },
        } = data;
        return (
          <div>
            <p><img src={thumbs[0].url} alt={title} /></p>
            <a href={vendorUrl}>{title}</a>
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
