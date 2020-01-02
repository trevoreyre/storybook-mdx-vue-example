const path = require("path");

const filterRules = filters => rule => {
  return filters.some(filter => String(rule.test) === String(filter));
};

module.exports = {
  presets: ["@storybook/addon-docs/preset"],
  stories: ["../src/**/*.stories.(js|mdx)"],

  // Modify webpack to remove babel-preset-vue from .mdx loaders
  webpack: async config => {
    const rules = config.module.rules;
    const mdxRules = rules.filter(
      filterRules([/\.mdx$/, /\.(stories|story).mdx$/])
    );
    let [jsxRule] = rules.filter(filterRules([/\.(mjs|jsx?)$/]));

    mdxRules.forEach(mdxRule => {
      const [babelLoader] = mdxRule.use.filter(
        ({ loader }) => loader === "babel-loader"
      );
      babelLoader.options.presets = babelLoader.options.presets.filter(
        preset => !preset.includes("babel-preset-vue")
      );
    });

    const [babelLoader] = jsxRule.use.filter(({ loader }) => loader === 'babel-loader')
    babelLoader.options = {
      cacheDirectory: path.resolve(__dirname, '..', 'node_modules', '.cache', 'storybook'),
      presets: ['@vue/app'],
      babelrc: false
    }

    return config;
  }
};
