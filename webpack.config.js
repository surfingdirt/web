const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
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
    filename: '[name].bundle.js',
    publicPath: '/',
    chunkFilename: '[name].chunk.js',
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
          name: '[name].[ext]',
          outputPath: 'images/',
        },
      },
      {
        test: /\.(otf|ttf|woff|eot)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
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
      template: './src/template.html',
      filename: './template.html',
      inject: false,
    }),
    new ReactLoadablePlugin({
      filename: path.resolve(__dirname, buildConfig.outDirectory, 'react-loadable.json'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 0,
      minRatio: 1,
    }),
  ],
  // required for some obscure reason (build will fail without this)
  // https://github.com/webpack-contrib/css-loader/issues/447
  node: {
    fs: 'empty',
  },
  stats: { children: false },
};
