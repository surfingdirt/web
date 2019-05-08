const messages = (getText, getPlural) => (key) =>
  ({
    privacyPolicy: getText('Privacy Policy', 'PrivacyPolicy') /* Header */,
    description: getText(
      'Description',
      'PrivacyPolicy',
    ) /* Description of the privacy policy page */,
    name: getText('Privacy Policy', 'PrivacyPolicy') /* Name of the privacy policy page */,
  }[key]);

export default messages;
