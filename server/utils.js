import parser from 'accept-language-parser';

// Language list taken from http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
export const ARABIC = 'ar';
export const ENGLISH_US = 'en-US';
export const FRENCH_FRANCE = 'fr-FR';
export const SPANISH_SPAIN = 'es-ES';
export const HEBREW = 'he';

export const DEFAULT_LOCALE = ENGLISH_US;

// Note: make sure to edit src/Components/Widgets/Form/LocaleField/translatedLocales.js when adding locales
export const SUPPORTED_LOCALES = [ENGLISH_US, FRENCH_FRANCE, SPANISH_SPAIN];
export const RTL_LANGUAGES = [ARABIC, HEBREW];

export const RIGHT_TO_LEFT = 'rtl';
export const LEFT_TO_RIGHT = 'ltr';

const LOCALE_QUERY_ARG = 'locale';
const TRACING_REQUESTS_QUERY_ARG = 'tracing';
const TRACING_FIELDS_QUERY_ARG = 'traceFields';

export const getLocaleAndDirFromRequest = (req) => {
  let locale = parser.pick(SUPPORTED_LOCALES, req.headers['accept-language'] || '');
  if (!locale) {
    locale = DEFAULT_LOCALE;
  }

  if (req.query[LOCALE_QUERY_ARG] && SUPPORTED_LOCALES.includes(req.query[LOCALE_QUERY_ARG])) {
    locale = req.query[LOCALE_QUERY_ARG];
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

export const getTracingContext = (req, tracingConfig) => {
  // Disabling takes precedence
  if (tracingConfig.alwaysDisabled) {
    return { traceAllRequests: false, traceFields: false };
  }

  // Then honor configuration...
  let { traceAllRequests, traceFields } = tracingConfig;

  // Unless query params say otherwise.
  if (req.query[TRACING_REQUESTS_QUERY_ARG]) {
    traceAllRequests = !!parseInt(req.query[TRACING_REQUESTS_QUERY_ARG], 10);
  }
  if (req.query[TRACING_FIELDS_QUERY_ARG]) {
    traceFields = !!parseInt(req.query[TRACING_FIELDS_QUERY_ARG], 10);
  }

  return { traceAllRequests, traceFields };
};
