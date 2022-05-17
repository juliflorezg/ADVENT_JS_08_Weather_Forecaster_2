const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')

const styleRule = {
  test: /\.scss$/,
  use: [
    // 'style-loader',
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: `./assets/`,
      },
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            [
              'autoprefixer',
              {
                grid: 'autoplace',
              },
            ],
          ],
        },
        sourceMap: true,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    },
  ],
}
const jsRule = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
    },
  },
}
const imgRule = {
  test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        // name: '[path][name].[ext]',
        outputPath: 'assets',
        // type: 'asset/resource'
      },
    },
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
          quality: 69,
          progressive: true,
          dcScanOpt: 2,
          // arithmetic: true,
        },
        // optipng.enabled: false will disable optipng
        optipng: {
          enabled: true,
          optimizationLevel: 7,
        },
        pngquant: {
          quality: [0.65, 0.7],
          speed: 2,
        },
        gifsicle: {
          interlaced: false,
        },
      },
    },
  ],
}

module.exports = {
  // mode: 'development',
  // mode: 'production',
  // set entry and output
  entry: {
    bundlefile: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name]-[contenthash].js',
    clean: true,
    assetModuleFilename: '[name][ext]',
  },
  devtool: 'source-map',
  watch: true,
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    client: {
      // abre un overlay con los errores
      overlay: {
        warnings: false,
        errors: true,
      },
    },
  },
  // loaders for load more assets to the js file
  module: {
    // an object for each file type
    rules: [styleRule, jsRule, imgRule],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack tutorial',
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new MiniCssExtractPlugin({
      // filename: '[name]-[contenthash].css',
      filename: '[name][contenthash].css',
    }),
    new Dotenv(),
  ],
}
