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
            // Specific aliases must come before general '@' alias
            '@/assets': './assets',
            '@/components': './src/components',
            '@/constants': './src/constants',
            '@/types': './src/types',
            '@/utils': './src/utils',
            '@': './src',
          },
        },
      ],
    ],
  };
};
