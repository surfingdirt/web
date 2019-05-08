/* eslint-disable react/prop-types */

import { storiesOf } from '@storybook/react';
import ResponsiveSwitcher from 'Components/ResponsiveSwitcher';
import React from 'react';

import { standardScreenWidths } from '../src/responsiveConfig';

const ResponsiveVersionBlue = ({ className }) => (
  <div className={className} style={{ backgroundColor: '#00F', color: 'white' }}>
    This is the low-end mobile version
  </div>
);

const ResponsiveVersionGreen = ({ className }) => (
  <div className={className} style={{ backgroundColor: '#0F0', color: 'white' }}>
    This is the high-end mobile version
  </div>
);

const ResponsiveVersionRed = ({ className }) => (
  <div className={className} style={{ backgroundColor: '#F00', color: 'white' }}>
    This is the low-end desktop version
  </div>
);

const ResponsiveVersionOrange = ({ className }) => (
  <div className={className} style={{ backgroundColor: '#F80', color: 'white' }}>
    This is the high-end desktop version
  </div>
);

const { MOBILE_LOW, MOBILE_HI, DESKTOP_LOW, DESKTOP_HI } = standardScreenWidths;
const widthToComponentMap = {
  [MOBILE_LOW]: ResponsiveVersionBlue,
  [MOBILE_HI]: ResponsiveVersionGreen,
  [DESKTOP_LOW]: ResponsiveVersionRed,
  [DESKTOP_HI]: ResponsiveVersionOrange,
};

storiesOf('ResponsiveSwitcher', module).add('renders 1 component per size', () => (
  <ResponsiveSwitcher widthToComponentMap={widthToComponentMap}>
    <ResponsiveVersionOrange />
    <ResponsiveVersionRed />
    <ResponsiveVersionGreen />
    <ResponsiveVersionBlue />
  </ResponsiveSwitcher>
));

const widthToComponentMap2 = {
  [MOBILE_LOW]: ResponsiveVersionOrange,
  [MOBILE_HI]: ResponsiveVersionOrange,
  [DESKTOP_LOW]: ResponsiveVersionRed,
  [DESKTOP_HI]: ResponsiveVersionRed,
};

storiesOf('ResponsiveSwitcher', module).add('renders 2 components per size', () => (
  <ResponsiveSwitcher widthToComponentMap={widthToComponentMap2}>
    <ResponsiveVersionOrange />
    <ResponsiveVersionRed />
  </ResponsiveSwitcher>
));
