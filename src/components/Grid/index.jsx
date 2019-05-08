import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import styles from './styles.scss';

export default class Grid extends PureComponent {
  static propTypes = {
    ariaLabel: PropTypes.string,
    type: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    // Trying to say "renderer is a component" here, but there is no good way to do that:
    renderer: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  };

  static defaultProps = {
    ariaLabel: '',
  };

  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(item) {
    const { renderer: Renderer } = this.props;
    return <Renderer key={item.id} item={item} />;
  }

  render() {
    const { ariaLabel, type, items } = this.props;

    switch (type) {
      case 'fixed-col3':
        return <div className={styles.fixedCol3}>{items.map(this.renderItem)}</div>;
      case 'col2':
        return (
          <div aria-label={ariaLabel} className={styles.col2}>
            {items.map(this.renderItem)}
          </div>
        );

      case 'col3':
        return (
          <div aria-label={ariaLabel} className={styles.col3}>
            {items.length === 4 || items.length === 5
              ? items.map((item, index) => index < 3 && this.renderItem(item))
              : items.map((item, index) => index <= 5 && this.renderItem(item))}
          </div>
        );
      case 'col4':
        return (
          <div aria-label={ariaLabel} className={styles.col4}>
            {items.map((item) => this.renderItem(item))}
          </div>
        );
      default:
        throw new Error(`Unsupported type grid type '${type}'`);
    }
  }
}

export const buildPlaceholderItemList = (count) => {
  return [...Array(count)].map((_, i) => ({ id: i }));
};
