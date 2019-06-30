/* eslint-disable react/prefer-stateless-function, import/prefer-default-export */
import PropTypes from 'prop-types';
import React from 'react';
import { Route } from 'react-router';

import Header, { headerTypes } from 'Components/Header';
import HeadMetaData from 'Components/HeadMetaData';
import Paragraph from 'Components/Paragraph/index';
import Translate from 'Hocs/Translate';

import messages from './messages';
import styles from './styles.scss';

const { PRIMARY } = headerTypes;

class RawPage404 extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string,
    }).isRequired,
    t: PropTypes.func.isRequired,
  };

  render() {
    const { match, t } = this.props;
    const DESCRIPTION = t('description');
    const PICTURE = 'picture';
    const NAME = t('name');
    const { url } = match;

    return (
      <Route
        render={({ staticContext }) => {
          if (staticContext) {
            staticContext.status = 404;
          }
          return (
            <div className={styles.container}>
              <HeadMetaData description={DESCRIPTION} image={PICTURE} title={NAME} url={url} />
              <Header type={PRIMARY}>{t('pageNotFound')}</Header>
              <Paragraph>{t('thePageYouRequested')}</Paragraph>
            </div>
          );
        }}
      />
    );
  }
}

export const Page404 = Translate(messages)(RawPage404);
