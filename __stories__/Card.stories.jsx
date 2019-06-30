import { storiesOf } from '@storybook/react';
import Card, { cardTypes } from 'Components/Card';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const { HERO, FLOW } = cardTypes;

storiesOf('Card', module).add('Hero card', () => (
  <BrowserRouter>
    <Card type={HERO} title="This is one fine card">
      <p>Some content</p>
    </Card>
  </BrowserRouter>
));
