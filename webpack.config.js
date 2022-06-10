const path = require("path");

module.exports = {
    entry: "../app/javascript/packs/index.js",
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module:{
        rules:[{
            loader: 'babel-loader',
            test: /\.js$|jsx/,
            exclude: /node_modules/
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
}
.babelrc
{
    "presets": ["env", "react","@babel/preset-env"],
    "plugins": [
        "transform-class-properties"
    ]
}