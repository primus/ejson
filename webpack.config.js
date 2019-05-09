'use strict';

const webpack = require('webpack');
const { join } = require('path');

const config = {
  mode: 'none',
  entry: join(__dirname, 'vendor', 'ejson.js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            parserOpts: { allowImportExportEverywhere: true },
            plugins: ['import-to-require', 'add-module-exports'],
            presets: [['@babel/preset-env', { modules: 'cjs' }]]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      Base64: [join(__dirname, 'vendor', 'base64.js'), 'Base64'],
      Meteor: join(__dirname, 'vendor', 'meteor.js')
    })
  ]
};

module.exports = [
  {
    ...config,
    output: {
      filename: 'bundle.js',
      library: 'EJSON',
      libraryExport: 'EJSON',
      libraryTarget: 'var',
      path: __dirname
    }
  },
  {
    ...config,
    output: {
      filename: 'index.js',
      libraryExport: 'EJSON',
      libraryTarget: 'commonjs2',
      path: __dirname
    }
  }
];
