require('@babel/polyfill');
const babelConfig = require('./babel.config');
require('@babel/register')(babelConfig);

require('./build-translations.content');
