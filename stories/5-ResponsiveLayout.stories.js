import React from 'react';

import ResponsiveLayout from '../src/components/Widgets/ResponsiveLayout';

export default {
  title: 'ResponsiveLayout',
};

export const Basic = () => {
  const childrenData = [
    ['A', <div>a content</div>],
    ['B', <div>b content</div>],
    ['C', <div>c content</div>],
    ['D', <div>d content</div>],
  ];
  return <ResponsiveLayout childrenData={childrenData} />;
};
