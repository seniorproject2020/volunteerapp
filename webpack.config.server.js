const path = require('path');
const nodeExternals = require('webpack-node-externals');

const outputDirectory = 'dist';

const serverConfig = {
  mode: process.env.NODE_ENV || 'development',
  entry: [
    'regenerator-runtime/runtime',
    './src/server/index.js'
  ],
  target: 'node',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, `${outputDirectory}`)
  },
  node: {
    __dirname: false
  },
  externals: [nodeExternals()]
};


module.exports = serverConfig;
