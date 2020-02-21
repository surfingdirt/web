/* eslint-disable import/prefer-default-export */
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import Translate from 'Hocs/Translate';
import NavigationLink from 'Components/Widgets/NavigationLink';
import { actionRoute } from 'Utils/links';
import actions from '~/actions';

import messages from './messages';
import styles from './styles.scss';

const { LOGOUT } = actions;

class LogoutForm extends React.Component {
  static propTypes = {
    buttonClassName: PropTypes.string,
    t: PropTypes.func.isRequired,
  };

  static defaultProps = {
    buttonClassName: null,
  };

  render() {
    const { buttonClassName, t } = this.props;

    const props = {
      className: classnames(styles.logout, buttonClassName),
      label: t('logout'),
      tag: 'button',
      type: 'submit',
    };
    return (
      <form action={actionRoute(LOGOUT)} method="POST" encType="multipart/form-data">
        <NavigationLink {...props} />
      </form>
    );
  }
}

export default Translate(messages)(LogoutForm);
