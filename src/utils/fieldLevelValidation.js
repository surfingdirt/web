const Validation = {
  required: (errorMessage) => (value) => (!value ? errorMessage : undefined),
  email: (errorMessage) => (value) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? errorMessage : undefined,
};

export default Validation;
