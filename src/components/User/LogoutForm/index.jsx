/* eslint-disable import/prefer-default-export */
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import Translate from 'Hocs/Translate';
import menuStyles from 'Components/Widgets/Menu/styles.scss';
import NavigationLink from 'Components/Widgets/NavigationLink';
import { actionRoute } from 'Utils/links';
import actions from '~/actions';

import messages from './messages';
import styles from './styles.scss';

const { LOGOUT } = actions;

class LogoutForm extends React.Component {
  static propTypes = {
    buttonClassName: PropTypes.string,
    renderAsNavigationLink: PropTypes.bool,
    t: PropTypes.func.isRequired,
  };

  static defaultProps = {
    buttonClassName: null,
    renderAsNavigationLink: false,
  };

  render() {
    const { buttonClassName, renderAsNavigationLink, t } = this.props;

    const className = classnames(styles.logout, buttonClassName);
    const label = t('logout');
    let content;
    if (renderAsNavigationLink) {
      const props = {
        className,
        label,
        tag: 'button',
        type: 'submit',
      };
      content = <NavigationLink {...props} />;
    } else {
      content = (
        <button type="submit" className={className}>
          {label}
        </button>
      );
    }
    return (
      <form action={actionRoute(LOGOUT)} method="POST" encType="multipart/form-data">
        {content}
      </form>
    );
  }
}

export default Translate(messages)(LogoutForm);
