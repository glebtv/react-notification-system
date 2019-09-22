var path = require('path');
var webpack = require('webpack');
var ExtractCssChunks = require("extract-css-chunks-webpack-plugin")

var JS_REGEX = /\.js$|\.jsx$|\.es6$|\.babel$/;

var sassLoaders = [
  'css-loader',
  'autoprefixer-loader?browsers=last 2 version',
  'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './example/src')
];

module.exports = {
  entry: [
    './example/src/scripts/App'
  ],
  output: {
    path: path.join(__dirname, 'example/build'),
    filename: 'app.js',
    publicPath: '../build/'
  },
  plugins: [
    new ExtractTextPlugin('app.css', { allChunks: true }),
    // set env
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('production')
      }
    }),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        sequences: true,
        dead_code: true,
        drop_debugger: true,
        comparisons: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        if_return: true,
        join_vars: true,
        cascade: true,
        drop_console: false
      },
      output: {
        comments: false
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.sass'],
    modules: ['node_modules', 'src']
  },
  module: {
    rules: [
      {
        test: JS_REGEX,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'example/src')
        ],
        loader: 'babel-loader?presets=airbnb'
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: ExtractCssChunks.loader,
            options: {
              hot: false,
              modules: false,
            }
          },
          'style-loader',
          'css-loader',
          'autoprefixer-loader?browsers=last 2 version',
          'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, 'example/src')
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff|eot|ttf)$/,
        loader: 'file-loader',
        exclude: /node_modules/
      }
    ]
  }
};
