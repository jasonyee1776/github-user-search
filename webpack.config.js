module.exports = {
    mode: "development",
    devServer: {
        // this line tells webpack to load the index.html from folder dis
        contentBase: "./dist"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{ loader: "babel-loader" }],
                exclude: /node_modules/
            }
        ]
    }
};