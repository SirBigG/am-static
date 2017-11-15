var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
require('popper.js');

module.exports = {
    //the base directory (absolute path) for resolving the entry option
    context: __dirname,
    //the entry point we created earlier. Note that './' means
    //your current directory. You don't have to specify the extension  now,
    //because you will specify extensions later in the `resolve` section
    entry: {main: './src/index.js',
            index: './src/jsx/apps/index/index.js',
            detail: './src/jsx/apps/detail/index.js',
            personal: './src/apps/personal/index.js'
    },

    output: {
        //where you want your compiled bundle to be stored
        path: path.resolve('/static/'),
        publicPath: '/static/',
        //naming convention webpack should use for your files
        filename: 'bundles/[name].js'
    },

    plugins: [
        //makes jQuery available in every module
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        }),
        new CopyWebpackPlugin([
            { from: 'node_modules/bootstrap/dist/css/bootstrap.min.css', to: 'css/bootstrap.min.css' },
            { from: 'node_modules/bootstrap/dist/css/bootstrap.min.css.map', to: 'css/bootstrap.min.css.map' },
            { from: 'node_modules/bootstrap/dist/js/bootstrap.min.js', to: 'js/bootstrap.min.js' },
            { from: 'node_modules/jquery/dist/jquery.min.js', to: 'js/jquery.min.js' },
            { from: 'node_modules/popper.js/dist/umd/popper.min.js', to: 'js/popper.min.js' },
            { from: 'node_modules/popper.js/dist/umd/popper.min.js.map', to: 'js/popper.min.js.map' }])
    ],

    module: {
        loaders: [
            //a regexp that tells webpack use the following loaders on all
            //.js and .jsx files
            {test: /\.jsx?$/,
                //we definitely don't want babel to transpile all the files in
                //node_modules. That would take a long time.
                exclude: /node_modules/,
                //use the babel loader
                loader: 'babel',
                query: {
                    //specify that we will be dealing with React code
                    presets: ['react']
                }
            },
            { test: /\.css$/, loader: "style-loader!css-loader"},
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader:"url?prefix=static/&limit=5000" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.png/, loader: 'url?prefix=static/&limit=5000'},
            { test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }
        ]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, "./src/scss")]
    },

    resolve: {
        //tells webpack where to look for modules
        modulesDirectories: ['node_modules'],
        //extensions that should be used to resolve modules
        extensions: ['', '.js', '.jsx', '.css', '.svg', '.ttf', '.woff', '.woff2', '.eot', '.png']
    }
};