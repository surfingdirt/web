/* eslint-disable react/prefer-stateless-function */

import Translate from 'Hocs/Translate';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import messages from './messages';

class ConfirmAccountPageContent extends Component {
  static propTypes = {
    confirmAccount: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null,
    };
  }

  async componentDidMount() {
    const { confirmAccount, t, token } = this.props;

    const {
      data: { confirmAccount: confirmAccountResponse },
    } = await confirmAccount({
      variables: {
        confirmationToken: token,
      },
    });

    let errorMessage;
    if (confirmAccountResponse.status === 404) {
      errorMessage = t(confirmAccountResponse.type);
    } else {
      errorMessage = t('accountConfirmed');
    }
    this.setState({ errorMessage });
  }

  render() {
    const { errorMessage } = this.state;

    return <div>{errorMessage}</div>;
  }
}

export default Translate(messages)(ConfirmAccountPageContent);
