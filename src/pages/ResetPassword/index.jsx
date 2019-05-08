/* eslint-disable import/prefer-default-export */

import RESET_PASSWORD from 'Apollo/mutations/resetPassword.gql';
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

class ResetPasswordPage extends Component {
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

    this.handleResetPassword = this.handleResetPassword.bind(this);
  }

  handleResetPassword({ password, passwordConfirmation }, resetPassword) {
    const { token } = this.state;

    resetPassword({
      variables: {
        resetPasswordToken: token.token,
        password,
        passwordConfirmation,
      },
    });
  }

  render() {
    const {
      state: { token },
      props: { location, t },
    } = this;
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
            <Header type="main">{t('resetPassword')}</Header>
            <Mutation mutation={RESET_PASSWORD}>
              {(resetPassword) => (
                <PageContent onSubmit={(data) => this.handleResetPassword(data, resetPassword)} />
              )}
            </Mutation>
          </div>
        )}
      </PageContainer>
    );
  }
}

export const ResetPassword = Translate(messages)(ResetPasswordPage);
