/* eslint-disable import/prefer-default-export */

import Header from 'Components/Header';
import HeadMetaData from 'Components/HeadMetaData';
import PageContainer from 'Components/PageContainer';
import Translate from 'Hocs/Translate';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import messages from '../messages';

import RegistrationSteps from '../RegistrationSteps';
import { PageContent } from './pageContent';
import SignupStates from './SignupStates';

class Step1Container extends Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string,
    }).isRequired,
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.goToState = this.goToState.bind(this);

    this.state = {
      signUpState: SignupStates.SIGNUP_STATE_1_REGISTRATION,
    };
  }

  goToState(signUpState) {
    this.setState({ signUpState });
  }

  render() {
    const {
      state: { signUpState },
      props: { match, t },
    } = this;

    const DESCRIPTION = t('description');
    const PICTURE = 'picture';
    const NAME = t('name');
    const { url } = match;

    return (
      <PageContainer className="limitedWidthContent">
        <HeadMetaData description={DESCRIPTION} image={PICTURE} title={NAME} url={url} />
        <Header type="main">{t('createNewAccount')}</Header>

        <RegistrationSteps current={1} />

        <PageContent signUpState={signUpState} goToState={this.goToState} />
      </PageContainer>
    );
  }
}

export const Step1 = Translate(messages)(Step1Container);
