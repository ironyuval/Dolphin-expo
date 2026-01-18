module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            '@/components': './src/components',
            '@/constants': './src/constants',
            '@/types': './src/types',
            '@/utils': './src/utils',
            '@/assets': './assets',
          },
        },
      ],
    ],
  };
};
