const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Pull out existing assetExts & sourceExts
const { resolver: { assetExts, sourceExts }, transformer } = defaultConfig;

module.exports = {
  ...defaultConfig,
  transformer: {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    ...defaultConfig.resolver,
    assetExts: assetExts.filter((ext) => ext !== 'svg'),       // remove svg from assets
    sourceExts: [...sourceExts, 'svg'],                         // treat svg as source
  },
};
