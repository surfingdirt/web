import React from 'react';
import { linkTo } from '@storybook/addon-links';

import Button from '../src/components/Widgets/Button';

export default {
  title: 'Button story',
  component: ButtonStory,
};

export const ButtonStory = () => <Button label="Titi" />;

ButtonStory.story = {
  name: 'Plain button',
};
