/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add a rule for .wasm files
    config.module.rules.push({
      test: /\.wasm$/,
      loader: 'wasm-loader',
    });

    // Add .wasm extension to Webpack's resolve.extensions array
    config.resolve.extensions.push('.wasm');

    return config;
  },
};

module.exports = nextConfig;

