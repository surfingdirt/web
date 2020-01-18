// See https://www.npmjs.com/package/webpack-pwa-manifest for documentation

const baseUrl = require('./baseUrl');

module.exports = {
  manifest: {
    name: 'Surfing Dirt',
    short_name: 'Surfing Dirt',
    description: 'Your online mountainboard community',
    background_color: '#201f1b',
    theme_color: '#201f1b',
    display: 'browser',
    scope: '/',
    start_url: '/',
    ios: true,
  },
  sw: {
    baseUrl,
  },
};
