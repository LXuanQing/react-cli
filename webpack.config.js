var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//判断当前运行环境是开发模式还是生产模式
const nodeEnv = process.env.NODE_ENV || 'development';
const isPro = nodeEnv === 'production';

console.log("当前运行环境：", isPro ? '生产环境' : '开发环境')

var plugins = [
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module) {
            // 该配置假定你引入的 vendor 存在于 node_modules 目录中
            return module.context && module.context.indexOf('node_modules') !== -1;
        }
    }),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, 'index.html')
    }),
    new webpack.DefinePlugin({
        // 定义全局变量
        'process.env':{
            'NODE_ENV': JSON.stringify(nodeEnv)
        },
        '__DEV__': !isPro
    })
]


if (isPro) {
  plugins.push(
      new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          comments: false,
          ie8: true
      })
  )
} else {
    plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
  )
}
var app = ['./entry'] // 可以有多个入口文件
module.exports = {
    context: path.resolve(__dirname, 'src'), //解析和加载的初始路径
    entry: {
        app: app
    },
    output: {
        filename: '[name].js', 
        path: path.join(__dirname, 'build'), 
        publicPath: isPro ? './' : '/', 
        chunkFilename: '[name].js'// 按需加载输出文件
    },
    plugins,
    // alias是配置全局的路径入口名称，只要涉及到下面配置的文件路径，可以直接用定义的单个字母表示整个路径
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.scss', '.css'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.join(__dirname, './src')
        ],
        alias: {
            "actions": path.resolve(__dirname, "src/actions"),
            "components": path.resolve(__dirname, "src/components"),
            "containers": path.resolve(__dirname, "src/containers"),
            "reducers": path.resolve(__dirname, "src/reducers"),
            "lib": path.resolve(__dirname, "src/lib")
        }
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader?cacheDirectory=true'
            }
        }, {
            test: /\.(less|css)$/,
            use: ExtractTextPlugin.extract({
                use: ["css-loader", "less-loader", "postcss-loader"]
            })
        }, {
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/, 
            use: ['url-loader?limit=1000&name=img/[name].[ext]']
        }]
    },
    devServer: {
        proxy: {
            '/api': {
              target: 'http://localhost:3000',
              changeOrigin: true,
              pathRewrite: {'^/api': ''}
            }
        },
        hot: true,
        compress: true,
        port: 3011,
        watchOptions: {
          ignored: /node_modules/,
        },
        stats: { // 控制编译的时候shell上的输出内容
            modules: false,
            chunks: false
        },
        overlay: false,// 编译出错的时候，在浏览器页面上是否显示错误，默认是false不显示
    },
};