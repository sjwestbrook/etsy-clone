// 3rd party js files

module.exports = {
  entry: './index.js',
  output: {
    path: './',
    filename: bundle.js
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /bower_components/,
        loader: 'babel',
        query: {
          compact: false;   // counteracts error: the code generator has deoptimized the styling of [some file] as it exceeds the max of "100KB"
          }
        }
    ]
  }
};
