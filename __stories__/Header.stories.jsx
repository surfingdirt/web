import { select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Header, { headerTypes } from 'Components/Header';
import React from 'react';

const typeLabel = 'Type';
const typeOptions = {};
headerTypes.forEach((t) => {
  typeOptions[t] = t;
});
const tagLabel = 'Tag';
const tagOptions = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
};

storiesOf('Header', module).add('main', () => (
  <Header type={select(typeLabel, typeOptions, 'main')} tag={select(tagLabel, tagOptions, 'h1')}>
    {text('Text', 'This is a header')}
  </Header>
));
