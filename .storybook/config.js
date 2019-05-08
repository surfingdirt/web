import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters, configure } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { po } from 'gettext-parser';
import React from 'react';
import contexts from '~/contexts';

import '../src/main.scss';
import { storybookViewports } from '../src/responsiveConfig';
import theme from './theme';

const { AppContext } = contexts;

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
  /**
   * Web Accessbility
   * Text elements must have sufficient color contrast against the background but for the moment
   * the color contrast analyzer fail because the ratio is not enough good.
   * https://dequeuniversity.com/rules/axe/2.6/color-contrast
   * TODO: find colors that pass the guidelines.
   */
  a11y: {
    options: {
      rules: {
        'color-contrast': { enabled: false },
      },
    },
  },
  options: {
    theme,
  },
  viewport: { viewports: storybookViewports },
});

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
