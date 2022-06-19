const path = require('path');

module.exports = {
  entry: './unbundled/root.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'js'),
  },
};