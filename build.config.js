const path = require('path');

const rootDir = path.resolve(__dirname);
const srcDir = path.resolve(__dirname, './src');

const resolverAliases = {};
[
  'apollo',
  'components',
  'error',
  'hocs',
  'images',
  'models',
  'pages',
  'sections',
  'server',
  'styles',
  'utils',
].forEach((folder) => {
  const alias = `${folder.charAt(0).toUpperCase()}${folder.slice(1)}`;
  resolverAliases[alias] = path.resolve(srcDir, folder);
});
resolverAliases['~'] = srcDir;
// resolverAliases['react'] = 'preact/compat';
// resolverAliases['react-dom'] = 'preact/compat';

module.exports = {
  outDirectory: 'dist',
  cssTemplateClass: '[name]__[local]--[hash:base64:5]',
  resolverAliases,
  rootDir,
};
