import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import TabPanel from 'Components/Widgets/Tabs/TabPanel';

import Tabs from './Tabs';
import styles from './styles.scss';

export const layoutTypes = {
  TWO_COLUMNS: 'twoColumns',
  THREE_COLUMNS: 'threeColumns',
};

const layoutClassNames = {
  [layoutTypes.TWO_COLUMNS]: styles.twoColumns,
  [layoutTypes.THREE_COLUMNS]: styles.threeColumns,
};

const ResponsiveLayout = ({ ariaLabel, childrenData, className, layout }) => {
  const [selected, setSelected] = useState(0);
  const classes = [
    styles.contentA,
    styles.contentB,
    styles.contentC,
    styles.contentD,
    styles.contentE,
    styles.contentF,
  ];

  // eslint-disable-next-line no-unused-vars
  const clonedChildren = childrenData.map(([label, child], i) =>
    React.cloneElement(child, {
      className: classnames(child.props.className, classes[i], {
        [styles.visible]: i === selected,
      }),
    }),
  );

  const layoutClassName = layout && layoutClassNames[layout];

  return (
    <div className={classnames(styles.wrapper, layoutClassName, className)}>
      <Tabs
        className={styles.tabs}
        ariaLabel={ariaLabel}
        onSelect={setSelected}
        selected={selected}
      >
        {childrenData.map(([label]) => (
          <TabPanel key={label} label={label} />
        ))}
      </Tabs>
      {clonedChildren}
    </div>
  );
};

ResponsiveLayout.propTypes = {
  childrenData: PropTypes.arrayOf([PropTypes.string.isRequired, PropTypes.node.isRequired])
    .isRequired,
  className: PropTypes.string,
  ariaLabel: PropTypes.string.isRequired,
  layout: (props, propName, componentName) => {
    const layout = props[propName];
    if (!layout) {
      return null;
    }

    if (!Object.values(layoutTypes).includes(layout)) {
      return new Error(`Invalid layout set for component '${componentName}': '${layout}'`);
    }

    return null;
  },
};
ResponsiveLayout.defaultProps = {
  className: null,
};

export default ResponsiveLayout;
