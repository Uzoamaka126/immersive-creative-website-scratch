const { merge } = require('webpack-merge')
const path = require('path')

const config = require('./webpack.config');

const extraRules = [
  {
    test: /\.css$/,
    use: ['css-loader']
  },
  {
    test: /\.scss$/,
    use: [ 
      {
          loader: "css-loader" // translates CSS into CommonJS
      }, 
      {
        loader: "sass-loader", // compiles Sass to CSS
      }
    ]
  }
];

module.exports = merge(config, {
  mode: 'development',

  // module: {
  //   rules: [
  //     {
  //       test: /\.css$/,
  //       use: ['css-loader']
  //     },
  //     {
  //       test: /\.scss$/,
  //       use: [ 
  //         {
  //             loader: "css-loader" // translates CSS into CommonJS
  //         }, 
  //         {
  //           loader: "sass-loader", // compiles Sass to CSS
  //         }
  //       ]
  //     }
  //   ]
  // },

  devtool: 'inline-source-map',

  output: {
    path: path.resolve(__dirname, 'public')
  },
})
