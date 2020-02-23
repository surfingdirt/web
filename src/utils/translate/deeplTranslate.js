const fetch = require('node-fetch');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const API_URL = 'https://api.deepl.com/v2/translate';

const EXCLUDE_PREFIX = '<x>';
const EXCLUDE_SUFFIX = '</x>';

const escapeRegExp = (string) => {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

const replaceAll = (str, find, replace) => {
  const res = str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
  return res;
};

const exclude = (term) => `${EXCLUDE_PREFIX}${term}${EXCLUDE_SUFFIX}`;

// Mostly excluding terms from translation:
const TERM_TRANSFORMS = {
  'Surfing Dirt': exclude('Surfing Dirt'),

  // Remove the 'ing' from the word because we don't want it to stay as-is in the translations
  Mountainboarding: exclude('Mountainboard'),
  mountainboarding: exclude('mountainboard'),

  Mountainboarders: exclude('Mountainboarders'),
  mountainboarders: exclude('mountainboarders'),
};

const translate = (apiKey, translationKey, sourceLanguage, destinationLanguage) => {
  // return Promise.resolve({ translations: [{ text: translationKey }] });
  const params = new URLSearchParams();
  params.append('text', translationKey);
  params.append('source_lang', sourceLanguage);
  params.append('target_lang', destinationLanguage);
  params.append('split_sentences', '0');
  params.append('preserve_formatting', '1');
  params.append('tag_handling', 'xml');
  params.append('ignore_tags', 'x');
  params.append('auth_key', apiKey);
  const url = `${API_URL}?${params.toString()}`;
  const body = fetch(url, { method: 'GET' }).then((result) => result.json());
  return body;
};

const addExclusions = (messageRaw) => {
  const messageWithExclusions = Object.entries(TERM_TRANSFORMS).reduce(
    (currentMessage, [from, to]) => {
      const regex = new RegExp(`(${from})`);
      const replaced = currentMessage.replace(regex, `${to}`);
      return replaced;
    },
    messageRaw,
  );
  return messageWithExclusions;
};

module.exports = (apiKey, messageRaw, sourceLanguage, destinationLanguage, callback) => {
  const message = addExclusions(messageRaw);
  translate(apiKey, message, sourceLanguage, destinationLanguage)
    .then((data) => {
      console.log('Received response:', data);
      if (!data.translations || data.translations.length === 0) {
        throw new Error('No translation found');
      }
      const translated = data.translations[0].text;
      const clean = replaceAll(replaceAll(translated, EXCLUDE_PREFIX, ' '), EXCLUDE_SUFFIX, ' ')
        .replace(/  +/g, ' ')
        .trim();
      // const dom = new JSDOM(translated);
      // const clean = dom.window.document.body.textContent;
      console.log({ clean });
      callback(null, clean);
    })
    .catch((error) => {
      callback(error, null);
    });
};
