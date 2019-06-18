const messages = (getText, getPlural) => (key) =>
  ({
    logoAlt: getText('Logo', 'Footer') /* Description for the site logo */,
    name: getText('Surfing Dirt', 'Footer') /* Name of the website */,
    welcome: getText('Welcome', 'Footer') /* Label of a link to the welcome page */,
    support: getText('Support', 'Footer') /* Label of a link to the user support page */,
    termsOfService: getText(
      'Terms of Service',
      'Footer',
    ) /* Label of a link to the terms of service page */,
    privacyPolicy: getText(
      'Privacy Policy',
      'Footer',
    ) /* Label of a link to the privacy policy page */,
    followUs: getText(
      'Follow Us!',
      'Footer',
    ) /* Name of a section containing links to social media accounts */,
    appleDownload: getText(
      'Download on the App Store',
      'Footer',
    ) /* Label of a link to download associated app on the Apple store */,
    googleDownload: getText(
      'Get it on Google Play',
      'Footer',
    ) /* Label of a link to download associated app on the Google Play store */,
    sitemap: getText('Sitemap', 'Footer') /* Label of a link to the sitemap page */,
    privacy: getText('Privacy', 'Footer') /* Label of a link to the privacy policy page */,
    termsConditions: getText(
      'Terms & Conditions',
      'Footer',
    ) /* Label of a link to the terms and conditions page */,
    cookiePolicy: getText(
      'Cookie policy',
      'Footer',
    ) /* Label of a link to the terms of the cookie policy page */,
    scrollTop: getText(
      'Back to Top',
      'Footer',
    ) /* Label of a link to the terms of the cookie policy page */,
  }[key]);

export default messages;
