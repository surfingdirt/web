import { storiesOf } from '@storybook/react';
import SVG from 'Components/SVG';
import Like from 'Images/_old/like.svg';
import Share from 'Images/_old/share.svg';
import React, { Fragment } from 'react';

const style = {
  backgroundColor: '#000000',
  color: '#ffffff',
  width: '200px',
  height: '200px',
};

storiesOf('SVGs', module).add('resting', () => (
  <Fragment>
    <div style={style}>
      <SVG icon={Like} label="resting heart" />
    </div>
    <div style={style}>
      <SVG icon={Share} label="resting share" hollow />
    </div>
  </Fragment>
));

storiesOf('SVGs', module).add('active', () => (
  <Fragment>
    <div style={style}>
      <SVG icon={Like} active label="active heart" />
    </div>
    <div style={style}>
      <SVG icon={Share} active label="active share" hollow />
    </div>
  </Fragment>
));
