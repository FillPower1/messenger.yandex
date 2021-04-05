module.exports = ({ env }) => {
    const plugins = [require('postcss-import')(), require('postcss-nested')()]

    if (env === 'production') {
        plugins.push(require('cssnano')())
    }

    return {
        plugins
    }
}
