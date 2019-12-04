/* eslint-disable react/prefer-stateless-function, import/prefer-default-export */
import PropTypes from 'prop-types';
import React from 'react';
import { Route } from 'react-router';
import Card, { cardTypes } from 'Components/Card';
import { Helmet } from 'react-helmet-async';

import Translate from 'Hocs/Translate';

import messages from './messages';
import { OldForum } from 'Pages/OldForum';

const { STANDARD } = cardTypes;

class Page404 extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;

    return (
      <Route
        render={({ staticContext }) => {
          if (staticContext) {
            staticContext.status = 404;
          }
          return (
            <Card type={STANDARD} title={t('pageNotFound')}>
              <Helmet>
                <title>{t('pageNotFound')}</title>
                <meta name="description" content={t('thePageYouRequested')} />
                <meta property="og:description" content={t('thePageYouRequested')} />
              </Helmet>
              <p>{t('thePageYouRequested')}</p>
            </Card>
          );
        }}
      />
    );
  }
}

export default Translate(messages)(Page404);
