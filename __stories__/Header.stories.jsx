ort { storiesOf } from '@storybook/react';
import Header, { headerTypes } from 'Components/Header';
import React from 'react';

const { PRIMARY, SECONDARY } = headerTypes;

storiesOf('Header', module).add('main', () => (
  <Header type={PRIMARY}>This is a primary header</Header>
));

storiesOf('Header', module).add('main', () => (
  <Header type={SECONDARY}>This is a secondary header</Header>
));
