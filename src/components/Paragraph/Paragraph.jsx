import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.scss';

const classMapping = {
  introduction: 'introduction',
  basic: 'basic',
  longText: 'long-text',
  note: 'note',
};

// Get all declared paragraph types.
export const paragraphTypes = Object.keys(classMapping);

export default class Paragraph extends React.PureComponent {
  static propTypes = {
    type: (props, propName, componentName) => {
      const type = props[propName];
      if (!type) {
        return new Error(`Empty type set for component '${componentName}'`);
      }

      if (!paragraphTypes.includes(type)) {
        return new Error(`Invalid type set for component '${componentName}': '${type}'`);
      }

      return undefined;
    },
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    className: '',
    type: 'basic',
  };

  render() {
    const { type, className, children } = this.props;

    const defaultClassName = classMapping[type];

    const actualClassName = classnames(styles[defaultClassName], styles[className]);

    return <p className={actualClassName}>{children}</p>;
  }
}
