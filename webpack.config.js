const path = require('path');

module.exports = {
  entry: {
    js: ['babel-polyfill', './src/index.jsx'],
  },
  devtool: 'source-map',
  output: {
    path: __dirname,
    filename: './bundle.js',
  },
  devServer: {
    inline: true,
    port: 8000,
    contentBase: './src',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /typings/],
        loaders: [{
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'react', 'stage-1'],
          },
        }],
      },
      {
        test: /\.scss$/,
        exclude: [/node_modules/, /typings/],
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/, /typings/],
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
  },
};
