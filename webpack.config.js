const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development'
module.exports = {
  mode: environment,
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
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
    extensions: ['.js', '.jsx', '.json']
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
        use: ['style-loader',
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
        }]
      },
      {
        test: /\.less$/,
        use: ['style-loader',
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
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    //热更新插件
    new webpack.HotModuleReplacementPlugin()
  ]
}
