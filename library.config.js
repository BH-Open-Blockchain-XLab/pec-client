const webpack = require('webpack');
const path = require('path');

module.exports = {
    output: {
        path: path.resolve(__dirname, './dev/library'),
        filename: '[name].js',
        library: '[name]',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", 
                    "css-loader", 
                    "sass-loader", 
                ]
            },
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: ['babel-loader']
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
        ]
    },
    entry: {
        "lib": [
          'react',
          'redux',
          '@material-ui/core',
          '@material-ui/icons',
          'connected-react-router',
          'react-dom',
          'react-redux',
          'redux-thunk',
          'typeface-roboto',
        ],
    },
    plugins: [
        new webpack.DllPlugin({
            path: './dev/library/[name].json',
            name: '[name]',
        }),
    ],
};
