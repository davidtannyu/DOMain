module.exports = {
  entry: './lib/main.js',
  output: {
    path: './lib',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '*']
  },
  devtool: 'source-maps'
};
