import { RTL_LANGUAGES, LEFT_TO_RIGHT, RIGHT_TO_LEFT, SUPPORTED_LOCALES } from '../../server/utils';

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
