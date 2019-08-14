import { storiesOf } from '@storybook/react';
import Heading, { headingTypes } from 'Components/Heading/index';
import React from 'react';

const { PRIMARY, SECONDARY } = headingTypes;

storiesOf('Heading', module).add('main', () => (
  <Heading type={PRIMARY}>This is a primary heading</Heading>
));

storiesOf('Heading', module).add('main', () => (
  <Heading type={SECONDARY}>This is a secondary heading</Heading>
));
