import { boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import InputField from 'Components/Form/InputField';
import React from 'react';
import { Field } from 'react-final-form';

const label = 'Type';
const options = {
  password: 'password',
  email: 'email',
  text: 'text',
};
const defaultValue = 'text';

storiesOf('Form', module).add('Input', () => (
  <Field
    component={InputField}
    label={text('Label', 'email')}
    name={text('Name', 'email')}
    placeholder="Type something"
    required={boolean('Required', true)}
    type={select(label, options, defaultValue)}
    errorLabel="This field has an error"
    validLabel="This field is valid"
    requiredLabel="This field is required"
  />
));
