const path = require("path");

module.exports = {
    entry: "./src/game.js",
    mode: "production",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        static: "./dist",
    },
};
