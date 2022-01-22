const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.vue'],
    },
    entry: {
        // main.js 기준으로 javascript를 합쳐서 output에 정의한 file 생성
        app: path.join(__dirname, 'main.js')
    },
    module: {
        // webpack의 핵심
        rules: [{
            /* 
                webpack 시 javascript에 대한 부분만 처리 가능하기 때문에
                vue에 대한 처리를 위해 vue-loader 설치 및 rules 내 정의
            */
            test: /\.vue$/,
            loader: 'vue-loader'           
        }]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    output: {
        //
        //filename: 'app.js'
        filename: '[name].js',
        path: path.join(__dirname, 'dist')
    } 
}