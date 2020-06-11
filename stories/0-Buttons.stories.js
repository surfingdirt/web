import React from 'react';

import Button from '../src/components/Widgets/Button';

export default {
  title: 'Buttons',
  component: Buttons,
};

export const Buttons = () => <Button label="Titi" />;

Buttons.story = {
  name: 'Plain button',
};
