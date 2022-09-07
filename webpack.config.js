const path = require('path');

module.exports = {
  entry: './unbundled/root.js',
  module: {
    rules: [
      {
        test: /\.(png)/,
        type: 'asset/resource'
      }
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'js'),
  }
};