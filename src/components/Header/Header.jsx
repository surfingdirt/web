import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.scss';

const typeMapping = {
  main: ['h1', 'main'],
  category: ['h2', 'category'],
  heroMain: ['h2', 'heroMain'],
  heroSecondary: ['h2', 'heroSecondary'],
  titleHighlight: ['h3', 'titleHighlight'],
};

// Get all declared header types.
export const headerTypes = Object.values(typeMapping).map((m) => m[1]);

export default class Header extends React.PureComponent {
  static propTypes = {
    type: (props, propName, componentName) => {
      const type = props[propName];
      if (!type) {
        return new Error(`Empty type set for component '${componentName}'`);
      }

      if (!headerTypes.includes(type)) {
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
