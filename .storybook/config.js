import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters, configure } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { po } from 'gettext-parser';
import React from 'react';
import AppContext from '~/contexts';

import '../src/main.scss';
import theme from './theme';

const translations = po.parse(`
  "Content-Type: text/plain; charset=UTF-8\\n"
  "Project-Id-Version: \\n"
  "POT-Creation-Date: \\n"
  "PO-Revision-Date: \\n"
  "Language-Team: \\n"
  "MIME-Version: 1.0\\n"
  "Content-Transfer-Encoding: 8bit\\n"
  "X-Generator: Poedit 2.2.1\\n"
  "Last-Translator: \\n"
  "Language: En\\n"
`);

const ContextDecorator = (storyFn) => (
  <AppContext.Provider value={{ availableLanguages: ['en'], language: 'en', translations }}>
    {storyFn()}
  </AppContext.Provider>
);

const req = require.context('../__stories__', true, /.stories.jsx?$/);

addDecorator(ContextDecorator);
addDecorator(withKnobs);
addDecorator(withA11y);

addParameters({
  options: {
    theme,
  },
});

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
