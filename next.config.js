const withTM = require('next-transpile-modules')(['date-fns/esm/locale']);

module.exports = withTM({
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/]
      },

      use: ['@svgr/webpack'],
    });

    return config;
  },
});

