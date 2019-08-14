const messages = (getText, getPlural) => (key) =>
  ({
    /* No context for these messages as they must be shared across the app */
    inputPlaceholder: getText(
      'Enter something',
    ) /* Text appearing inside a form field before the user entered anything */,
    email: getText('Email') /* Label of a form field for the user's email */,
    firstname: getText('First name') /* Label of a form field for the user's first name */,
    lastname: getText('Last name') /* Label of a form field for the user's last name */,
    password: getText('Password') /* Label of a form field for the user's password */,
    passwordConfirmation: getText(
      'Password confirmation',
    ) /* Label of a form field to confirm the user's password */,
    passwordMismatch: getText(
      'Passwords must match',
    ) /* Error message indicating that the two password form fields don't match */,
    required: getText(
      'Required',
    ) /* Short adjective indicating the user must fill a particular form field */,
    username: getText('Username') /* Label of a form field for the user's username */,
    createAccount: getText('Create Account', 'UserForm') /* Title of the user creation form */,
    requiredLegend: getText('* Required', 'UserForm') /* Indicates a form field is mandatory */,
    yourPrivacy: getText(
      'Your Privacy',
      'UserForm',
    ) /* Label for a section of a form that explains how the service handles user privacy */,
    checkboxLabel: getText(
      'I have read and agreed to the Terms & Conditions',
      'UserForm',
    ) /* Label for a checkbox the user can use to acknowledge they have read terms and conditions */,
    privacyDescription: getText(
      'Our Privacy Policy sets out why we collect data from you and how it will be processed. You can manage your email preferences and change the information we send to you at any time by accessing your account via "Settings" in the app.',
      'UserForm',
    ) /* Paragraph explaining how the service handles user privacy */,
  }[key]);

export default messages;
