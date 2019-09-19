import { storiesOf } from '@storybook/react';
import DualContainer from 'Components/DualContainer/index';
import React from 'react';

storiesOf('DualContainer', module).add('Basic usage', () => (
  <DualContainer>
    <span>Left Element</span>
    <span>Right Element</span>
  </DualContainer>
));
