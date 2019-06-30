import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import DropCap from 'Components/DropCap';

import styles from './styles.scss';

const STANDARD = 'standard';
export const paragraphTypes = { STANDARD };

const classMapping = {
  [STANDARD]: null,
};

const insertDropCap = (children) => {
  const clones = React.Children.toArray(children);
  // Naive implementation: starting a paragraph with a <span> or any other element will fail:
  if (typeof clones[0] === 'string') {
    const [firstWord, ...rest] = clones[0].split(' ');
    clones[0] = (
      <Fragment key={0}>
        <DropCap word={firstWord} /> {rest.join(' ')}
      </Fragment>
    );
    return clones;
  }

  throw new Error('Cannot insert Dropcap to pargraph because it does not start with text');
};

export default class Paragraph extends React.PureComponent {
  static propTypes = {
    type: (props, propName, componentName) => {
      const type = props[propName];
      if (!type) {
        return new Error(`Empty type set for component '${componentName}'`);
      }

      if (!Object.values(paragraphTypes).includes(type)) {
        return new Error(`Invalid type set for component '${componentName}': '${type}'`);
      }

      return undefined;
    },
    className: PropTypes.string,
    widthDropCap: PropTypes.bool,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    className: '',
    type: STANDARD,
    widthDropCap: false,
  };

  render() {
    const { children, className, type, widthDropCap } = this.props;

    const typeClassName = classMapping[type];
    const actualClassName = classnames(styles.default, styles[typeClassName], className);

    return <p className={actualClassName}>{widthDropCap ? insertDropCap(children) : children}</p>;
  }
}
