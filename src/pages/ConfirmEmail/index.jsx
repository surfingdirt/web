import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import queryString from 'query-string';

import CONFIRM_EMAIL from 'Apollo/mutations/confirmEmail.gql';
import Button, { buttonTypes } from 'Components/Button';
import Card, { cardTypes } from 'Components/Card';
import Spinner from 'Components/Spinner';
import Translate from 'Hocs/Translate';
import routes from '~/routes';

import messages from './messages';
import styles from './styles.scss';

const { STANDARD } = cardTypes;
const { ACTION } = buttonTypes;
const { LOGIN } = routes;

class ConfirmEmailRaw extends PureComponent {
  static propTypes = {
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    t: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      done: false,
      error: false,
      result: { status: null, alreadyDone: null },
    };
  }

  render() {
    const {
      props: { location, t },
      state: {
        done,
        error,
        result: { status, alreadyDone },
      },
    } = this;

    const { id: userId, key: aK } = queryString.parse(location.search);

    if (!done) {
      return (
        <Mutation mutation={CONFIRM_EMAIL}>
          {(mutate) => {
            mutate({
              variables: { userId, input: { aK } },
            })
              .then(({ data }) => {
                const { confirmEmail: result } = data;
                this.setState({ done: true, result });
                console.log({ status, alreadyDone });
              })
              .catch((e) => {
                this.setState({ done: true, error: true });
                console.log({ e });
              });
            return <Spinner />;
          }}
        </Mutation>
      );
    }

    if (error) {
      return <p>Error</p>;
    }

    return (
      <Card title={t('confirmation')} type={STANDARD}>
        <p>{t('congratulations')}</p>
        <p>{t('nowWhat')}</p>
        <div className={styles.buttonWrapper}>
          <Button type={ACTION} href={LOGIN} label={t('signIn')} />
        </div>
      </Card>
    );
  }
}

export const ConfirmEmail = Translate(messages)(ConfirmEmailRaw);
