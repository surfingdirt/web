import parser from 'accept-language-parser';

// Language list taken from http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
const ARABIC = 'ar';
const ENGLISH_US = 'en-US';
const FRENCH_FRANCE = 'fr-FR';
const HEBREW = 'he';

const DEFAULT_LOCALE = ENGLISH_US;
const SUPPORTED_LOCALES = [ENGLISH_US, FRENCH_FRANCE];
const RTL_LANGUAGES = [ARABIC, HEBREW];

const RIGHT_TO_LEFT = 'rtl';
const LEFT_TO_RIGHT = 'ltr';

const getLocalesAndDirFromRequest = (req) => {
  let locale = '';

  let currentLocale = parser.pick(SUPPORTED_LOCALES, req.headers['accept-language'] || '');
  if (!currentLocale) {
    currentLocale = DEFAULT_LOCALE;
  }

  if (req.query.lang && SUPPORTED_LOCALES.includes(req.query.lang)) {
    locale = req.query.lang;
  } else {
    locale = currentLocale;
  }

  const dir = RTL_LANGUAGES.includes(locale.split('-')[0]) ? RIGHT_TO_LEFT : LEFT_TO_RIGHT;

  return {
    availableLocales: SUPPORTED_LOCALES,
    locale,
    dir,
  };
};

export default { getLocalesAndDirFromRequest };
