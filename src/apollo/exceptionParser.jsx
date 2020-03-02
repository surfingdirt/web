import { FORM_ERROR } from 'final-form';

const BAD_USER_INPUT = 'BAD_USER_INPUT';

/**
 * In order to display errors, we need to translate them.
 * Since most errors will come from the backend and will all be the same, it makes sense to create
 * a dedicated component so that translations are not tied to a particular form, but rather to put
 * them all in one big pool.
 * @see ErrorMessage.
 * @param errors
 * @param formErrorMessage
 * @param t
 */
const renderTranslatedErrors = (errors, formErrorMessage, t) => {
  const translatedErrors = {};

  Object.keys(errors).forEach((key) => {
    const errorName = errors[key];
    if (!errorName || key.indexOf('__') === 0) {
      return;
    }
    translatedErrors[key] = t(key);
  });

  translatedErrors[FORM_ERROR] = formErrorMessage;

  return translatedErrors;
};

export const translateParsedErrors = (e, formErrorMessage, t) => {
  const errors = {};
  e.graphQLErrors.forEach(({ extensions: { code, exception } }) => {
    if (code === BAD_USER_INPUT) {
      Object.assign(errors, exception.errors);
    } else {
      console.log(`Unhandled error code '${code}'`, exception);
    }
  });
  return renderTranslatedErrors(errors, formErrorMessage, t);
};

export const extractErrorCode = (e) => {
  let errors = [];
  if (
    e.graphQLErrors &&
    e.graphQLErrors.length > 0 &&
    e.graphQLErrors[0].extensions &&
    e.graphQLErrors[0].extensions.response.body &&
    e.graphQLErrors[0].extensions.response.body.errors
  ) {
    errors = Object.values(e.graphQLErrors[0].extensions.response.body.errors);
  }
  if (errors.length === 0) {
    return null;
  }

  return errors[0].code;
};
