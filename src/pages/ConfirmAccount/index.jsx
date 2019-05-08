/* eslint-disable import/prefer-default-export, no-console */

import CONFIRM_ACCOUNT from 'Apollo/mutations/confirmAccount.gql';
import Header from 'Components/Header';
import HeadMetaData from 'Components/HeadMetaData';
import PageContainer from 'Components/PageContainer';
import Translate from 'Hocs/Translate';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import messages from './messages';

import PageContent from './pageContent';
import styles from './styles.scss';

class ConfirmAccountPage extends Component {
  static propTypes = {
    location: PropTypes.objectOf(PropTypes.string).isRequired,
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const { location } = this.props;

    this.state = {
      token: queryString.parse(location.search),
    };
  }

  render() {
    const { location, t } = this.props;
    const { token } = this.state;
    const DESCRIPTION = t('description');
    const PICTURE = 'picture';
    const NAME = t('name');
    const { pathname } = location;

    return (
      <PageContainer className={styles.container}>
        <HeadMetaData description={DESCRIPTION} image={PICTURE} title={NAME} url={pathname} />
        {Object.keys(token).length === 0 ? (
          <div>{t('errorOccured')}</div>
        ) : (
          <div>
            <Header type="main">{t('confirmAccount')}</Header>
            <Mutation mutation={CONFIRM_ACCOUNT}>
              {(confirmAccount) => {
                return <PageContent token={token.token} confirmAccount={confirmAccount} />;
              }}
            </Mutation>
          </div>
        )}
      </PageContainer>
    );
  }
}

export const ConfirmAccount = Translate(messages)(ConfirmAccountPage);
