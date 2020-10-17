import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card, { cardTypes } from 'Components/Widgets/Card';
import styles from 'Components/Widgets/Tabs/styles.scss';

const { BARE } = cardTypes;

const Tabs = ({ ariaLabel, className, children, onSelect, selected }) => {
  return (
    <Card type={BARE} className={classnames(styles.wrapper, className)}>
      <div className={styles.tabList} role="tablist" aria-label={ariaLabel}>
        {children.map((tab, i) => {
          const { id: tabId, label: tabLabel, className: tabClassName } = tab.props;
          return (
            <button
              aria-controls={tabId}
              aria-selected={i === selected}
              className={classnames(styles.tab, tabClassName)}
              id={tabId}
              key={tabId}
              onClick={() => {
                console.log('onClick', i);
                onSelect(i);
              }}
              role="tab"
              tabIndex={tab === selected ? 0 : -1}
              type="button"
            >
              {tabLabel}
            </button>
          );
        })}
      </div>
    </Card>
  );
};

Tabs.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  onSelect: PropTypes.func,
  selected: PropTypes.number.isRequired,
};

Tabs.defaultProps = {
  className: null,
  onSelect: () => {},
};

export default Tabs;
