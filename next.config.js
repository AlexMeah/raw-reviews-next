const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    webpack: (config, { dev }) => {
        if (process.env.ANALYZE) {
            config.plugins.push(
                new BundleAnalyzerPlugin({
                    analyzerMode: 'server',
                    openAnalyzer: true,
                    generateStatsFile: true,
                    statsFilename: './stats.json'
                })
            );
        }

        // For the development version, we'll use React.
        // Because, it support react hot loading and so on.
        if (dev) {
            return config;
        }

        config.resolve.alias = {
            react: 'inferno-compat',
            'react-dom': 'inferno-compat'
        };

        return config;
    }
};
