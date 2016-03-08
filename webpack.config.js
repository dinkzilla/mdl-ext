if (!global.Promise) {
  console.log("require es6-promise");
  global.Promise = require('es6-promise').polyfill();
}

const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const env = require('yargs').argv.mode;

const cssLoader = [
  'css-loader?sourceMap',
  'postcss-loader'
].join('!');

const styleLoader = [
  'css-loader?sourceMap',
  'postcss-loader',
  'resolve-url-loader',
  'sass-loader?sourceMap&expanded'
].join('!');

const libraryName = 'index';

var plugins = [], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + '.min.js';
}
else {
  outputFile = libraryName + '.js';
}

var config = {
  entry: {
    lavu: [
      path.join(__dirname, 'src/lavu-mdl.scss'), // Styles
      path.join(__dirname, 'src/index.js')       // Add your application's scripts last
    ],
    mdl: [                                    // Scripts packaged into 'vendor.js'
      path.join(__dirname, 'src/vendor.scss')
      // +++ other 3'rd party
    ]
  },
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    preLoaders: [
      {
        loader: 'eslint',
        test: /\.js[x]?$/,
        include: [                     // ... or: exclude: /(node_modules|bower_components)/,
          path.join(__dirname, 'src'),
          path.join(__dirname, 'test')
        ]
      }
      /*, Temporarly disabled
      {
        loader: 'stylelint',
        test: /\.s(a|c)ss$/,
        include: [
          path.join(__dirname, 'src')
        ]
      }
      */
    ],
    loaders: [
      {
        test: /\.js[x]?$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, 'src'),
        loader: ExtractTextPlugin.extract('style-loader', styleLoader)
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src'),
        loader: ExtractTextPlugin.extract('style-loader', cssLoader)
      }
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './node_modules'),
      path.resolve(__dirname, './src')
    ]
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  stylelint: {
    configFile: path.join(__dirname, './.stylelint.config.js'),
    configOverrides: {
      rules: {
        // Your rule overrides here
      }
    }
  },
  eslint: {
    // .eslintrc
  },
  resolve: {
    root: path.resolve('./src'),
    modulesDirectories: ['src', 'node_modules'],
    extensions: ['', '.js', '.jsx', '.css', '.scss', 'html']
  },
  plugins: [
    new ExtractTextPlugin('[name].css', {
      disable: false,
      allChunks: true
    })
  ]
};

module.exports = config;
