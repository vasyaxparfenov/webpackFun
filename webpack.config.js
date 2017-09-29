var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry:{
        app :'./src/main.ts',
        vendor : './src/vendor.ts',
        polyfills : './src/polyfills.ts'
    },
    output:{
        filename:'[name].bundle.js',
        path: path.resolve(__dirname,'dist','assets'),
        publicPath:'assets'
    },
    devServer:{
        contentBase:path.resolve(__dirname,'src')
    },
    resolve:{
        extensions:['.ts','.js'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },

    module:{
        rules: [
            {
                test:/\.ts$/,
                loaders:[
                    {
                        loader:'awesome-typescript-loader',
                        options: {
                            configFileName:'./src/tsconfig.app.json'
                        }
                    },
                    'angular2-template-loader'
                ],
                exclude: /node_modules/
            },
           
            {
                test:/.css$/,
                exclude: path.resolve(__dirname,'src','app'),
                loader: ExtractTextPlugin.extract({fallbackLoader:'style-loader',loader:'css-loader'})
                
            },
            {
                test:/.css$/,
                include: path.resolve(__dirname,'src','app'),
                loader: ExtractTextPlugin.extract({fallbackLoader:'style-loader',loader:'css-loader'})
            },
            {
                test:/\.html$/,
                loader:'html-loader'
            }
        ]
    },
    plugins:[
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(__dirname, '../src')
        ),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'src/index.html'),
            inject:true,
            "assets":{
                "styles":"style.css"
            }
        }),
        new ExtractTextPlugin({
            filename:'styles.css',
            allChunks:true

        })
    ]
}