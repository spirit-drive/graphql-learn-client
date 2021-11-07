const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

const port = 8080;
const dist = path.join(__dirname, 'dist');
const src = path.join(__dirname, 'src');
const host = 'localhost';

module.exports = {
  mode: 'development',
  target: 'web',
  stats: 'minimal',
  context: src,
  entry: './index.tsx',
  output: {
    path: dist,
    publicPath: `http://${host}:${port}/`,
    filename: `js/[name].js`,
    chunkFilename: `js/[name].js`,
  },
  devtool: 'source-map',
  devServer: {
    port,
    hot: true,
    historyApiFallback: true,
    overlay: true,
    host,
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    runtimeChunk: true,
  },
  resolve: {
    modules: [src, 'node_modules'],
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      src: path.resolve('./src'),
    },
    fallback: { crypto: false },
  },
  plugins: [
    new HtmlPlugin({
      template: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: src,
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
        include: src,
      },
    ],
  },
};
