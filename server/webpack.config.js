const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const environment = process.env.ENVIRONMENT || 'production';

console.log('environment:::::', environment);

let ENVIRONMENT_VARIABLES = {
  'process.env.ENVIRONMENT': JSON.stringify('development'),
  'process.env.PORT': JSON.stringify('4000'),
  'process.env.DB_URL': JSON.stringify('mongodb://mongo-db:27017'),
};

if (environment === 'test') {
  ENVIRONMENT_VARIABLES = {
    'process.env.ENVIRONMENT': JSON.stringify('test'),
    'process.env.PORT': JSON.stringify('4000'),
    'process.env.DB_URL': JSON.stringify('mongodb://mongo-db:27017'),
  };
} else if (environment === 'production') {
  ENVIRONMENT_VARIABLES = {
    'process.env.ENVIRONMENT': JSON.stringify('test'),
    'process.env.PORT': JSON.stringify('4000'),
    'process.env.DB_URL': JSON.stringify(process.env.DB_URL),
  };
}

module.exports = {
  entry: './server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'api.bundle.js',
  },
  target: 'node',
  plugins: [new webpack.DefinePlugin({ ENVIRONMENT_VARIABLES }), new Dotenv()],
};
