const messages = (getText, getPlural) => (key) =>
  ({
    termsConditions: getText('Terms & Conditions', 'TermsAndConditions') /* Header */,
    description: getText(
      'Description',
      'TermsAndConditions',
    ) /* Description of the Terms & Conditions page */,
    name: getText(
      'Terms & Conditions',
      'TermsAndConditions',
    ) /* Name of the Terms & Conditions page */,
  }[key]);

export default messages;
