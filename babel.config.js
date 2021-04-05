module.exports = (api) => {
    api.cache(false)

    const presets = ['@babel/preset-typescript', '@babel/preset-env']
    const plugins = [
        '@babel/plugin-proposal-class-properties',
        'babel-plugin-transform-class-properties',
        '@babel/plugin-proposal-object-rest-spread'
    ]

    return { presets, plugins }
}
