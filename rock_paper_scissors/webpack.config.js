const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',
    devtool: 'eval',
    devServer: {
        //contentBase: __dirname + "/dist/",
        //inline: true,
        //hot: true,
        host: "localhost",
        port: 5501,
        // 아래 내용 추후 찾아볼것
        //devMiddleware: { publicPath: '/dist' },
        static: { directory: path.resolve(__dirname) },
        //hot: true
    },
    resolve: {
        extensions: ['.js', '.vue']
    },
    entry: {
        app: path.join(__dirname, 'main.js')
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader'
        },
        {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader'
            ]
        }]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist'
    }
}