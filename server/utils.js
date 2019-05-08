import parser from 'accept-language-parser';

// Language list taken from http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
const ARABIC = 'ar';
const ENGLISH = 'en';
const FRENCH = 'fr';
const HEBREW = 'he';

const DEFAULT_LANGUAGE = ENGLISH;
const SUPPORTED_LANGUAGES = [ARABIC, FRENCH, HEBREW, ENGLISH];
const RTL_LANGUAGES = [ARABIC, HEBREW];

const RIGHT_TO_LEFT = 'rtl';
const LEFT_TO_RIGHT = 'ltr';

const getLanguagesAndDirFromRequest = (req) => {
  let language = '';

  let currentLanguage = parser.pick(SUPPORTED_LANGUAGES, req.headers['accept-language'] || '');
  if (!currentLanguage) {
    currentLanguage = DEFAULT_LANGUAGE;
  }

  if (req.query.lang && SUPPORTED_LANGUAGES.includes(req.query.lang)) {
    language = req.query.lang;
  } else {
    language = currentLanguage;
  }

  const dir = RTL_LANGUAGES.includes(language) ? RIGHT_TO_LEFT : LEFT_TO_RIGHT;

  return {
    availableLanguages: SUPPORTED_LANGUAGES,
    language,
    dir,
  };
};

export default { getLanguagesAndDirFromRequest };
