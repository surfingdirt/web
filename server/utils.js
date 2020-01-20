import parser from 'accept-language-parser';

// Language list taken from http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
const ARABIC = 'ar';
const ENGLISH_US = 'en-US';
const FRENCH_FRANCE = 'fr-FR';
const HEBREW = 'he';

const DEFAULT_LOCALE = ENGLISH_US;

// Note: make sure to edit src/Components/Widgets/Form/LocaleField/translatedLocales.js when adding locales
const SUPPORTED_LOCALES = [ENGLISH_US, FRENCH_FRANCE];
const RTL_LANGUAGES = [ARABIC, HEBREW];

const RIGHT_TO_LEFT = 'rtl';
const LEFT_TO_RIGHT = 'ltr';

const getLocalesAndDirFromRequest = (req) => {
  let locale = parser.pick(SUPPORTED_LOCALES, req.headers['accept-language'] || '');
  if (!locale) {
    locale = DEFAULT_LOCALE;
  }

  if (req.query.locale && SUPPORTED_LOCALES.includes(req.query.locale)) {
    locale = req.query.locale;
  }

  const dir = RTL_LANGUAGES.includes(locale.split('-')[0]) ? RIGHT_TO_LEFT : LEFT_TO_RIGHT;

  return {
    availableLocales: SUPPORTED_LOCALES,
    locale,
    dir,
  };
};

export default { getLocalesAndDirFromRequest };
