let webpack = require('webpack');

module.exports = {
    entry: __dirname+'/src/entry.js',
    output: {
        path: __dirname+'/build',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    resolve: {//指定可以被import的文件名后缀
        extensions: ['.js', '.jsx','.sass','.ts']
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react','stage-0']
                } //将react编译成js文件
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            //打包css文件
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            //编译sass文件
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
            //对图片进行打包
        ]
    },
    //4、服务器依赖包配置
    devServer: {//注意：网上很多都有colors属性，但是实际上的webpack2.x已经不支持该属性了
        contentBase: "./build",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    }
}