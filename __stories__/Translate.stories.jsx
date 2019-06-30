import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { po } from 'gettext-parser';
import Translate from 'Hocs/Translate';
import PropTypes from 'prop-types';
import React from 'react';
import AppContext from '../src/contexts';

const esTranslations = `
  "Content-Type: text/plain; charset=UTF-8\\n"
  "Project-Id-Version: \\n"
  "POT-Creation-Date: \\n"
  "PO-Revision-Date: \\n"
  "Language-Team: \\n"
  "MIME-Version: 1.0\\n"
  "Content-Transfer-Encoding: 8bit\\n"
  "X-Generator: Poedit 2.2.1\\n"
  "Last-Translator: \\n"
  "Plural-Forms: nplurals=2; plural=(n > 1);\\n"
  "Language: es\\n"
  
  msgid "Hello World!"
  msgstr "¡Ola, mundo!"
  
  msgid "I have one thing"
  msgid_plural "I have %d things"
  msgstr[0] "Tengo %d cosa"
  msgstr[1] "Tengo {{n}} cosas"
`;

const frTranslations = `
"Content-Type: text/plain; charset=UTF-8\\n"
"Project-Id-Version: \\n"
"POT-Creation-Date: \\n"
"PO-Revision-Date: \\n"
"Language-Team: \\n"
"MIME-Version: 1.0\\n"
"Content-Transfer-Encoding: 8bit\\n"
"X-Generator: Poedit 2.2.1\\n"
"Last-Translator: \\n"
"Language: fr\\n"

msgid "Hello World!"
msgstr "Salut tout le monde!"

msgid "I have one thing"
msgid_plural "I have %d things"
msgstr[0] "J'ai %d chose"
msgstr[1] "J'ai %d choses"
`;

const HelloWorldRaw = ({ getText }) => <span>{getText('Hello World!')}</span>;
HelloWorldRaw.propTypes = {
  getText: PropTypes.func.isRequired,
};

const HelloWorld = Translate()(HelloWorldRaw);

storiesOf('Translate', module).add('English translation', () => (
  <AppContext.Provider value={{ availableLanguages: ['en'], language: 'en', translations: {} }}>
    <HelloWorld />
  </AppContext.Provider>
));

storiesOf('Translate', module).add('Spanish translation', () => (
  <AppContext.Provider
    value={{ availableLanguages: ['es'], language: 'es', translations: po.parse(esTranslations) }}
  >
    <HelloWorld />
  </AppContext.Provider>
));

storiesOf('Translate', module).add('French translation', () => (
  <AppContext.Provider
    value={{ availableLanguages: ['fr'], language: 'fr', translations: po.parse(frTranslations) }}
  >
    <HelloWorld />
  </AppContext.Provider>
));

const HaveThingsRaw = ({ getPlural }) => (
  <span>
    {getPlural('I have one thing', 'I have %d things', parseInt(text('Number of things', '5'), 10))}
  </span>
);
HaveThingsRaw.propTypes = {
  getPlural: PropTypes.func.isRequired,
};

const HaveThings = Translate()(HaveThingsRaw);

storiesOf('Translate', module).add('Plural English translation', () => (
  <AppContext.Provider value={{ availableLanguages: ['en'], language: 'en' }}>
    <HaveThings />
  </AppContext.Provider>
));

storiesOf('Translate', module).add('Plural Spanish translation', () => (
  <AppContext.Provider
    value={{ availableLanguages: ['es'], language: 'es', translations: po.parse(esTranslations) }}
  >
    <HaveThings />
  </AppContext.Provider>
));

storiesOf('Translate', module).add('Plural French translation', () => (
  <AppContext.Provider
    value={{ availableLanguages: ['fr'], language: 'fr', translations: po.parse(frTranslations) }}
  >
    <HaveThings />
  </AppContext.Provider>
));
