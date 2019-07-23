import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.scss';

const SMALL = 'small';
const STANDARD = 'standard';
const LARGE = 'large';
const RESPONSIVE = 'responsive';

export const userProfileTypes = { SMALL, STANDARD, LARGE, RESPONSIVE };

class UserProfile extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        height: PropTypes.number.isRequired,
        size: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
      }),
    ).isRequired,
    label: PropTypes.string,
    type: (props, propName, componentName) => {
      const type = props[propName];
      if (!type) {
        return new Error(`Empty type set for component '${componentName}'`);
      }

      if (!Object.values(userProfileTypes).includes(type)) {
        return new Error(`Invalid type set for component '${componentName}': '${type}'`);
      }

      return undefined;
    },
  };

  static defaultProps = {
    className: null,
    label: '',
  };

  render() {
    const { images, className, label, type } = this.props;
    const src = images[0].url;

    const sizeClassName = styles[type];
    return <img alt={label} src={src} className={classnames(styles.wrapper, sizeClassName, className)} />;
  }
}

export default UserProfile;
