require('dotenv').config();

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  server: {
    port: parseInt(process.env.METRO_PORT || '5000', 10),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
