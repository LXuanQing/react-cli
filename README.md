## react-redux-router4-webpack-min
    支持:
        react按需加载
        es7静态属性 static defaultProps = {}
        async await 方法
        mock数据用koa和koa-router
        axios
        mac和window打包
        redux
        react-router4
        less
注意：上线时需要保留的文件 build images，然后把images文件放在build里面

## 运行
    npm i
    npm start
    npm run mock
## 打包
    npm run build-mac或npm run build-win


## Babel  下一代JavaScript 语法的编译器
.babelrc文件解析
    presets预设，安装方法babel-preset-
        es2015: 编译es6方法
        react:  编译jsx
        stage-x: 和es2015有些类似，但它是按照JavaScript的提案阶段区分的，一共有5个阶段。而数字越小，阶段越靠后，存在依赖关系。也就是说stage-0是包括stage-1的，以此类推。

    presets插件 有一些方法是presets中不提供的，需要单独引入。 安装方法babel-plugin-
        transform-runtime: 支持async
        transform-decorators-legacy: 支持decorator(装饰器)
        transform-do-expressions: 用于支持JSX书写if… else…语句
babel-cli用于命令行转码
babel-polyfill转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象和全局对象上的方法Object.assign、Array.from
babel-loader 解析js文件
babel-core 某些代码需要调用Babel的API进行转码

## webpack.config.js
    html-webpack-plugin 设置html模板
    extract-text-webpack-plugin 抽离css
    webpack.optimize.CommonsChunkPlugin 提取公共代码块
    webpack.DefinePlugin 定义全局变量

    在最新的React(V15)里，生产环境压缩React，会出现警告，添加下面会解决
    new webpack.DefinePlugin({
        "process.env": { 
            NODE_ENV: JSON.stringify(nodeEnv) 
        }
    })

    output:
        filename: '[name].js', // name替换为entry的对象和vendor
        path 存放生成打包文件的地方
        publicPath 所有相对路径引入的配置跟目录
            publicPath: isPro ? './aa/' : '/build/' 如果是生产环境，打包后less设置的背景图片路径是是 ./aa/images/xxx.png 也就是相对build目录下。图片大小超过限制时，打包成文件
            模板文件引入的js css 也是相对这个路径，如果是 ./aa  则src="./aa/app.js"
            总述：jsx里面的img不会编译，按根目录引入src="images/xx.png"
                 less的背景图片按相对当前路径引入
            上线时需要保留的文件 build images，然后把images文件放在build里面
    devServer详解
        contentBase: 指定了服务器资源的根目录，是个虚拟目录，表示热更新时的内存目录，运行 http://localhost:3011/#/ 时自动找改目录下的index.html
                    index.html引入的js、css也是该虚拟目录下的output输出目录。render里img标签图片引入也是相对于该虚拟目录
                    <script src="build/vendor.js"></script> 
        historyApiFallback: { // 对返回404页面时定向到特定页面
            rewrites:[
               {from:/./,to:'/404.html'}
            ]
        },
        publicPath: '/build/', // 热跟新内存中文件编译输出的目录
        proxy 接口写对才能代理成功

    HtmlWebpackPlugin 加载html模板文件，不要设置devserver里的contentbase