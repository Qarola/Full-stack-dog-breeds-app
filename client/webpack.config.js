const path = require('path');

module.exports = {
  mode: "development",
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.png/,
        type: 'asset/resource' 
      },
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    //port: 3000,
    //open: true
  }
}

