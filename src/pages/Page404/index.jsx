/* eslint-disable react/prefer-stateless-function, import/prefer-default-export */
import PropTypes from 'prop-types';
import React from 'react';
import { Route } from 'react-router';
import Card, { cardTypes } from 'Components/Card';

import Translate from 'Hocs/Translate';

import messages from './messages';

const { STANDARD } = cardTypes;

class RawPage404 extends React.Component {
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
              <p>{t('thePageYouRequested')}</p>
            </Card>
          );
        }}
      />
    );
  }
}

export const Page404 = Translate(messages)(RawPage404);
