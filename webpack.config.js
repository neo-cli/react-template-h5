const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')
const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const devtool = (environment === 'development' ? 'cheap-module-eval-source-map' : 'hidden-source-map')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  mode: environment,
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash:5].js',
    chunkFilename: '[name].[chunkhash:5].chunk.js'
  },
  devtool: 'hidden-source-map',
  devServer: {
    hot: true, // 热更新插件
    port: 8088,
    host: 'localhost',
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: { //browserHistory的时候，刷新会报404. 自动重定向到index.html
      index: './index.html'
    },
    proxy: {
      '/dev-api': {
        target: 'http://106.55.26.154:3003',
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/dev-api': '/api' }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'node_modules')
    },
    //当你加载一个文件的时候,没有指定扩展名的时候，会自动寻找哪些扩展名
    extensions: ['.js', '.jsx', '.json'],
    mainFields: ['jsnext:main', 'browser', 'main']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
            loader: 'babel-loader',
            options:{
             "presets": ["@babel/preset-env"],
             "plugins": [
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ["@babel/plugin-proposal-class-properties", { "loose" : true }]
             ]
            }
        },
        include: path.join(__dirname,'src'),
        exclude:/node_modules/
      },
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 0 }
          },
          {
            loader: 'postcss-loader',
            // options: {
            //     plugins: [
            //         require('autoprefixer')
            //     ]
            // }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 0 }
          },
          {
            loader: 'postcss-loader',
            // options: {
            //     plugins: [
            //         require('autoprefixer')
            //     ]
            // }
          },
          {
            loader: 'px2rem-loader',
            options: {
                remUnit: 75,
                remPrecesion: 8
            }
          },
          'less-loader'
        ],
        // exclude: /node_modules/
    },
    {
        test: /\.(jpg|png|gif|svg|jpeg)$/,
        use: ['url-loader']
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      use: [
        /* config.module.rule('media').use('url-loader') */
        {
          loader: 'url-loader',
          options: {
            limit: 4096,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'media/[name].[hash:8].[ext]'
              }
            }
          }
        }
      ]
    },
  ]
  },
  plugins: [
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['**/*'] }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    //热更新插件
    new webpack.HotModuleReplacementPlugin(),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|.\css|.less/, // 匹配文件名
      threshold: 10240, // 对超过10k的数据压缩
      deleteOriginalAssets: false // 不删除源文件
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:5].css',
      chunkFilename: '[id].css'
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // 压缩JS
      new TerserPlugin({}),
      // 压缩CSS
      new OptimizeCSSAssetsPlugin({})
    ],
    // 自动分割第三方模块和公共模块
    splitChunks: {
      chunks: 'all', // 默认作用于异步chunk，值为all/initial/async
      minSize: 0, // 默认值是30kb,代码块的最小尺寸
      minChunks: 1, // 被多少模块共享,在分割之前模块的被引用次数
      maxAsyncRequests: 3, // 限制异步模块内部的并行最大请求数的，说白了你可以理解为是每个import()它里面的最大并行请求数量
      maxInitialRequests: 5, // 限制入口的拆分数量
      automaticNameDelimiter: '~', // 默认webpack将会使用入口名和代码块的名称生成命名,比如 'vendors~main.js'
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // only package third parties that are initially dependent
        },
        antdUI: {
          name: 'chunk-antd', // split antdUI into a single package
          priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?antd(.*)/ // in order to adapt to cnpm
        },
        lodash: {
          name: 'chunk-lodash', // split lodash into a single package
          priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?lodash(.*)/ // in order to adapt to cnpm
        },
        echarts: {
          name: 'chunk-echarts', // split echarts into a single package
          priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?echarts(.*)/ // in order to adapt to cnpm
        },
        commons: {
          name: 'chunk-commons',
          minChunks: 3, //  minimum common number
          priority: 5,
          reuseExistingChunk: true
        }
      }
    },
    // 为了长期缓存保持运行时代码块是单独的文件
    runtimeChunk: 'single'
  }
}
