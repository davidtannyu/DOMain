module.exports = {
  entry: './lib/main.js',
  output: {
    path: './lib',
    filename: 'DOMain.js'
  },
  resolve: {
    extensions: ['.js', '*']
  },
  devtool: 'source-maps'
};
