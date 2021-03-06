import parser from 'accept-language-parser';

// Language list taken from http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
export const ARABIC = 'ar';
export const HEBREW = 'he';

export const GERMAN_GERMANY = 'de-DE';
export const ENGLISH_US = 'en-US';
export const SPANISH_SPAIN = 'es-ES';
export const FRENCH_FRANCE = 'fr-FR';
export const ITALIAN_ITALY = 'it-IT';
export const JAPANESE_JAPAN = 'ja-JA';
export const POLISH_POLAND = 'pl-PL';
export const PORTUGUESE_BRAZIL = 'pt-BR';
export const PORTUGUESE_PORTUGAL = 'pt-PT';
export const RUSSIAN_RUSSIA = 'ru-RU';

export const DEFAULT_LOCALE = ENGLISH_US;

// Note: make sure to edit src/Components/Widgets/Form/LocaleField/translatedLocales.js when adding locales
export const SUPPORTED_LOCALES = [
  ENGLISH_US,
  FRENCH_FRANCE,
  GERMAN_GERMANY,
  ITALIAN_ITALY,
  JAPANESE_JAPAN,
  POLISH_POLAND,
  PORTUGUESE_BRAZIL,
  // PORTUGUESE_PORTUGAL,
  RUSSIAN_RUSSIA,
  SPANISH_SPAIN,
];
export const RTL_LANGUAGES = [ARABIC, HEBREW];

export const RIGHT_TO_LEFT = 'rtl';
export const LEFT_TO_RIGHT = 'ltr';

export const JS_LESS = 'nojs';
const LOCALE_QUERY_ARG = 'locale';
const TRACING_REQUESTS_QUERY_ARG = 'tracing';
const TRACING_FIELDS_QUERY_ARG = 'traceFields';

export const isJSLess = (req) => !!req.query[JS_LESS] || !!req.cookies[JS_LESS];

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
