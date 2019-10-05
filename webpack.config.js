const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ReactLoadablePlugin } = require('@7rulnik/react-loadable/webpack');

const buildConfig = require('./build.config.js');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const devtool = mode === 'production' ? '' : 'eval-source-map';

module.exports = {
  mode,
  devtool,
  entry: './client/index.jsx',
  output: {
    path: path.join(__dirname, buildConfig.outDirectory),
    filename: '[name].[hash:3].bundle.js',
    publicPath: '/',
    chunkFilename: '[name].[hash:3].chunk.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: buildConfig.resolverAliases,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            configFile: false,
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-syntax-dynamic-import',
              '@7rulnik/react-loadable/babel',
            ],
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  loose: false,
                  shippedProposals: true,
                  useBuiltIns: 'usage',
                },
              ],
              '@babel/preset-react',
            ],
          },
        },
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:3].[ext]',
          outputPath: 'images/',
          publicPath: 'images',
        },
      },
      {
        test: /\.(otf|ttf|woff|eot)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:3].[ext]',
          outputPath: 'fonts/',
        },
      },
      {
        test: /\.css$/,
        use: [
          // include without further processing
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: buildConfig.cssTemplateClass,
              // how many loaders before css-loader should be
              // applied to @imported resources.
              importLoaders: 3,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                ctx: {
                  postcssPresetEnv: {},
                  clean: {},
                },
              },
              sourceMap: true,
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {},
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(svg|po)$/,
        loader: 'raw-loader',
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: process.env.NODE_ENV === 'production' },
          },
        ],
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/template.ejs',
      filename: './template.hbs',
      inject: false,
      favicon: './src/images/favicon.ico',
    }),
    new ReactLoadablePlugin({
      filename: path.resolve(__dirname, buildConfig.outDirectory, 'react-loadable.json'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:3].css',
      chunkFilename: '[id].[hash:3].css',
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 0,
      minRatio: 1,
    }),
    new CopyPlugin([{ from: './src/static', to: '[path]/[name].[hash:3].[ext]' }]),
    // Order matters, manifest plugin should be registered after copy plugin
    new ManifestPlugin({
      fileName: path.resolve(__dirname, 'static/manifest.json'),
      // filter: (file) => file.name.startsWith('images/'),
      filter: (file) => file.name.indexOf('images') !== -1,
      map: (file) => {
        const ret = Object.assign({}, file);
        console.log('Map', JSON.stringify(file, null, 2));
        if (process.env.NODE_ENV === 'production') {
          // Remove hash:3 in manifest key
          ret.name = file.name.replace(/(\.[a-f0-9]{32})(\..*)$/, '$2');
        }
        return ret;
      },
    }),
  ],
  // required for some obscure reason (build will fail without this)
  // https://github.com/webpack-contrib/css-loader/issues/447
  node: {
    fs: 'empty',
  },
  stats: { children: false },
};
