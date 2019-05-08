import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import SelectField from 'Components/Form/SelectField';
import React from 'react';
import { Field } from 'react-final-form';

storiesOf('Form', module).add('Select', () => (
  <Field
    component={SelectField}
    label={text('Label', 'country')}
    name={text('Name', 'country')}
    required={boolean('Required', true)}
  >
    <option>Country</option>
    <option name="france">France</option>
    <option name="spain">Spain</option>
  </Field>
));
