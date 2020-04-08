import React, { useState, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';

import * as keycode from 'Utils/keycodes';

import styles from './styles.scss';

function computeSelectedTab(pathname, tabs) {
  const locationsParts = pathname.split('/');
  const lastLocationPart = locationsParts[locationsParts.length - 1];

  const defaultTab = tabs.find(({ props: { defaultTab: d } }) => d);

  const found = tabs.find(({ props: { id } }) => id === lastLocationPart) || defaultTab;
  return found;
}

const Tabs = ({ ariaLabel, children, history, location, reverseTabOrder, url }) => {
  const tabs = reverseTabOrder ? children.slice().reverse() : children;
  const defaultTab = tabs.find(({ props: { defaultTab: d } }) => d);

  const initialTab = computeSelectedTab(location.pathname, tabs);
  const [selected, setSelected] = useState(initialTab);
  const [selectedIndex, setSelectedIndex] = useState(tabs.indexOf(selected));
  const lastTab = tabs.slice(-1)[0];
  const tabRefs = tabs.map(() => createRef());

  useEffect(() => {
    const newSelected = computeSelectedTab(location.pathname, tabs);
    setSelected(newSelected);
    setSelectedIndex(tabs.indexOf(newSelected));
    const anchorEl = tabRefs[selectedIndex];
    anchorEl.current.focus();
  }, [location.pathname, tabs]);

  const getTabLink = (tabIndex, tabId) => {
    return `${url}/${tabId}`;
  };

  const selectTab = (tab) => {
    const tabIndex = tabs.indexOf(tab);
    const link = getTabLink(tabIndex, tab.props.id);

    history.push(link);
    setSelected(tab);
    setSelectedIndex(tabs.indexOf(tab));
  };

  const previousTab = (tab) => {
    const index = tabs.indexOf(tab);

    if (index > 0) selectTab(tabs[index - 1]);
    if (index === 0) selectTab(lastTab);
  };

  const nextTab = (tab) => {
    const index = tabs.indexOf(tab);

    if (index < tabs.length - 1) selectTab(tabs[index + 1]);
    if (index === tabs.length - 1) selectTab(tabs[0]);
  };

  const handleClick = (e, tab) => {
    e.preventDefault();
    selectTab(tab);
  };

  const handleKeyDown = (e, tab) => {
    switch (e.keyCode) {
      case keycode.RIGHT: {
        nextTab(tab);
        break;
      }
      case keycode.LEFT: {
        previousTab(tab);
        break;
      }
      case keycode.HOME: {
        selectTab(tabs[0]);
        break;
      }
      case keycode.END: {
        selectTab(lastTab);
        break;
      }
      default:
        return;
    }
    e.preventDefault();
  };

  return (
    <div aria-label={ariaLabel} className={styles.tabs}>
      <div className={styles.tabList} role="tablist">
        {tabs.map((tab, tabIndex) => {
          const { id: tabId, label: tabLabel, className: tabClassName } = tab.props;
          const to = getTabLink(tabIndex, tabId);
          return (
            <Link
              to={to}
              aria-controls={tabId}
              id={tabId}
              className={classnames(styles.tab, tabClassName)}
              aria-selected={tabIndex === selectedIndex}
              key={tabId}
              onClick={(e) => handleClick(e, tab)}
              onKeyDown={(e) => handleKeyDown(e, tab)}
              role="tab"
              tabIndex={tab === selected ? 0 : -1}
              innerRef={(ref) => {
                tabRefs[tabIndex] = ref;
              }}
              ref={tabRefs[tabIndex]}
            >
              {tabLabel}
            </Link>
          );
        })}
      </div>
      {selected}
    </div>
  );
};

Tabs.defaultProps = {
  reverseTabOrder: false,
};

Tabs.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  reverseTabOrder: PropTypes.bool,
  url: PropTypes.string.isRequired,
};

export default withRouter(Tabs);
