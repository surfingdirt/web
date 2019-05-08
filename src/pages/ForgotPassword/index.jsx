/* eslint-disable import/prefer-default-export */

import FORGOT_PASSWORD from 'Apollo/mutations/forgotPassword.gql';
import Header from 'Components/Header';
import HeadMetaData from 'Components/HeadMetaData';
import PageContainer from 'Components/PageContainer';
import Translate from 'Hocs/Translate';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import messages from './messages';

import PageContent from './pageContent';
import styles from './styles.scss';

class ForgotPasswordPage extends Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string,
    }).isRequired,
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};

    this.handleForgotPassword = this.handleForgotPassword.bind(this);
  }

  async handleForgotPassword({ email }, forgotPassword) {
    const { t } = this.props;

    const {
      data: { forgotPassword: forgotPasswordResponse },
    } = await forgotPassword({
      variables: {
        email,
      },
    });

    let errorMessage;
    if (forgotPasswordResponse.status === 404) {
      errorMessage = t(forgotPasswordResponse.type);
    } else {
      errorMessage = t('emailSent');
    }
    this.setState({ errorMessage });
  }

  render() {
    const {
      state: { errorMessage },
      props: { match, t },
    } = this;
    const DESCRIPTION = t('description');
    const PICTURE = 'picture';
    const NAME = t('name');
    const { url } = match;

    return (
      <PageContainer className={styles.container}>
        <HeadMetaData description={DESCRIPTION} image={PICTURE} title={NAME} url={url} />
        <Header type="main">{t('forgotPassword')}</Header>
        <Mutation mutation={FORGOT_PASSWORD}>
          {(forgotPassword) => (
            <PageContent
              errorMessage={errorMessage}
              onSubmit={(data) => this.handleForgotPassword(data, forgotPassword)}
            />
          )}
        </Mutation>
      </PageContainer>
    );
  }
}

export const ForgotPassword = Translate(messages)(ForgotPasswordPage);
