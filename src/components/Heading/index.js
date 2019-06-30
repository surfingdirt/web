import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.scss';

const PRIMARY = 'primary';
const SECONDARY = 'secondary';
export const headingTypes = { PRIMARY, SECONDARY };

const typeMapping = {
  [PRIMARY]: ['h1', 'primary'],
  [SECONDARY]: ['h2', 'secondary'],
};

export default class Heading extends React.PureComponent {
  static propTypes = {
    type: (props, propName, componentName) => {
      const type = props[propName];
      if (!type) {
        return new Error(`Empty type set for component '${componentName}'`);
      }

      if (!Object.values(headingTypes).includes(type)) {
        return new Error(`Invalid type set for component '${componentName}': '${type}'`);
      }

      return undefined;
    },
    className: PropTypes.string,
    tag: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    className: '',
    tag: '',
  };

  render() {
    const { type, tag, className, children } = this.props;

    const [defaultTag, defaultClassName] = typeMapping[type];

    const Tag = tag || defaultTag;

    const actualClassName = classnames(styles[defaultClassName], className);

    return <Tag className={actualClassName}>{children}</Tag>;
  }
}
