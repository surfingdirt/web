import parser from 'accept-language-parser';

// Language list taken from http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
export const ARABIC = 'ar';
export const ENGLISH_US = 'en-US';
export const FRENCH_FRANCE = 'fr-FR';
export const HEBREW = 'he';

export const DEFAULT_LOCALE = ENGLISH_US;

// Note: make sure to edit src/Components/Widgets/Form/LocaleField/translatedLocales.js when adding locales
export const SUPPORTED_LOCALES = [ENGLISH_US, FRENCH_FRANCE];
export const RTL_LANGUAGES = [ARABIC, HEBREW];

export const RIGHT_TO_LEFT = 'rtl';
export const LEFT_TO_RIGHT = 'ltr';

export const getLocaleAndDirFromRequest = (req) => {
  let locale = parser.pick(SUPPORTED_LOCALES, req.headers['accept-language'] || '');
  if (!locale) {
    locale = DEFAULT_LOCALE;
  }

  if (req.query.locale && SUPPORTED_LOCALES.includes(req.query.locale)) {
    locale = req.query.locale;
  }

  const dir = RTL_LANGUAGES.includes(locale.split('-')[0]) ? RIGHT_TO_LEFT : LEFT_TO_RIGHT;

  return {
    locale,
    dir,
  };
};

export const getLocaleAndDirFromUser = (user, requestLocale, requestDir) => {
  if (!SUPPORTED_LOCALES.includes(user.locale)) {
    return { locale: requestLocale, dir: requestDir };
  }

  const { locale } = user;
  const dir = RTL_LANGUAGES.includes(locale.split('-')[0]) ? RIGHT_TO_LEFT : LEFT_TO_RIGHT;

  return {
    locale,
    dir,
  };
};
