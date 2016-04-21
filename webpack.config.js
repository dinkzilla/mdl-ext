if (!global.Promise) {
  console.log("require es6-promise");
  global.Promise = require('es6-promise').polyfill();
}

const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const env = require('yargs').argv.mode;

const css_loader = [
  'css-loader?sourceMap',
  'postcss-loader'
].join('!');

const sass_loader = [
  'css-loader?sourceMap',
  'postcss-loader',
  'resolve-url-loader',
  'sass-loader?sourceMap&expanded'
].join('!');

const libraryName = 'mdl-ext';
const cssName = 'mdl-ext';
var outputFile;
var outputCss;
var outputCssEqJs;

if (env === 'build') {
  outputFile = libraryName + '.min.js';
  outputCss = '[name].min.css';
  outputCssEqJs = cssName + '-eqjs.min.css';
}
else {
  outputFile = libraryName + '.js';
  outputCss = '[name].css';
  outputCssEqJs = cssName + '-eqjs.css';
}

var config = {
  entry: {
    'mdl-ext': [
      path.join(__dirname, 'src/mdl-ext-build.scss'),      // MDLEXT Styles
      path.join(__dirname, 'src/index.js')                 // MDLEXT scripts
    ],
    'mdl-ext-eqjs': [
      path.join(__dirname, 'src/mdl-ext-eqjs-build.scss'), // MDLEXT Styles based on eq.js
      path.join(__dirname, 'src/index.js')                 // MDLEXT scripts
    ]
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'lib'),
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
      /* Temporarly disabled due to conflict in stylelint packages
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
        loader: ExtractTextPlugin.extract('style-loader', sass_loader)
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src'),
        loader: ExtractTextPlugin.extract('style-loader', css_loader)
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
  /* Temporarly disabled due to conflict in stylelint packages
  stylelint: {
    configFile: path.join(__dirname, './.stylelint.config.js'),
    configOverrides: {
      rules: {
        // Your rule overrides here
      }
    }
  },
  */
  eslint: {
    // config in '.eslintrc'
  },
  resolve: {
    root: path.resolve('./src'),
    modulesDirectories: ['src', 'node_modules'],
    extensions: ['', '.js', '.jsx', '.css', '.scss', 'html']
  },
  plugins: [
    new ExtractTextPlugin(outputCss, {
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  devServer: {
    contentBase: './src',
    port: 8080,
    progress: true,
    colors: true,
    hot: true,                  // adds the HotModuleReplacementPlugin.
    historyApiFallback: false,  // when false, dev server make directory listing, good feature to navigate in project
    quiet: false,
    noInfo: false,
    lazy: false,
    aggregateTimeout: 300,
  }
};

module.exports = config;
