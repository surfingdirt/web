require('@babel/polyfill');
const babelConfig = require('./babel.config');
require('@babel/register')(babelConfig);

const sass = require('node-sass');
const assetHook = require('asset-require-hook');
const rawHook = require('raw-module-require-hook');
const csshook = require('css-modules-require-hook');
const buildConfig = require('./build.config');

// noinspection JSUnusedGlobalSymbols
csshook({
  generateScopedName: buildConfig.cssTemplateClass,
  extensions: ['.scss', '.css'],
  preprocessCss: (data, filename) => {
    if (filename.endsWith('.scss')) {
      return sass.renderSync({
        data,
        file: filename,
      }).css;
    }
    return data;
  },
});

assetHook({
  extensions: ['png'],
  mimetype: 'image/png',
  publicPath: '/images/',
  name: '[name].[ext]',
});

assetHook({
  extensions: ['jpg'],
  mimetype: 'image/jpeg',
  publicPath: '/images/',
  name: '[name].[ext]',
});

assetHook({
  extensions: ['jpeg'],
  mimetype: 'image/jpeg',
  publicPath: '/images/',
  name: '[name].[ext]',
});

assetHook({
  extensions: ['gif'],
  mimetype: 'image/gif',
  publicPath: '/images/',
  name: '[name].[ext]',
});

rawHook({
  extensions: ['svg', 'gql', 'graphql'],
});

/* eslint-disable */
(async function InitNode() {
  // Extends require to support webpack specific "require.ensure" & "require.include" during SSR
  const proto = Object.getPrototypeOf(require);

  if (!proto.hasOwnProperty('ensure')) {
    Object.defineProperties(proto, {
      ensure: {
        value: function ensure(modules, callback) {
          callback(this);
        },
        writable: false,
      },
      include: {
        value: function include() {},
        writable: false,
      },
    });
  }
})();
/* eslint-enable */

require('./server/server');
