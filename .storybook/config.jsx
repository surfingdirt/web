import { addDecorator, configure } from '@storybook/react';
import { po } from 'gettext-parser';
import React from 'react';

import AppContext from '~/contexts';
import '~/main.scss';

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

const req = require.context('../stories', true, /.stories.jsx?$/);

addDecorator(ContextDecorator);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
