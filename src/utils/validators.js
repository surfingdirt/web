const MIN_PASSWORD_LENGTH = 8;

export const isValidEmail = (value) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
};

export const isPasswordLongEnough = (value) => {
  return value.length >= MIN_PASSWORD_LENGTH;
};

export const required = (value) => !!value;

const Validation = {
  required: (errorMessage) => (value) => (!value ? errorMessage : undefined),
  email: (errorMessage) => (value) => (isValidEmail(value) ? errorMessage : undefined),
};

export default Validation;
