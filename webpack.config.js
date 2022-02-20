module.exports = function (env, args) {
    return args.mode === 'development' ? require("./config/webpack.dev") : require("./config/webpack.relase")
}