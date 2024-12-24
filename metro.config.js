// metro.config.js

const { getDefaultConfig } = require("@expo/metro-config");

const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
});

// Ensure the expo-asset plugin is included
config.transformer = {
  ...config.transformer,
  assetPlugins: ["expo-asset/tools/hashAssetFiles"],
};

// Enable Tamagui and add nice web support with optimizing compiler + CSS extraction
const { withTamagui } = require("@tamagui/metro-plugin");
module.exports = withTamagui(config, {
  components: ["tamagui"],
  config: "./tamagui.config.ts",
  outputCSS: "./tamagui-web.css",
});

// Optional: If you're working with .svg files as React components
config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "svg"
);
config.resolver.sourceExts.push("svg");
config.resolver.sourceExts.push("mjs");

config.transformer.babelTransformerPath = require.resolve(
  "react-native-svg-transformer"
);

module.exports = config;

// Clean version of metro.config.js

// const { getDefaultConfig } = require('expo/metro-config');

// const config = getDefaultConfig(__dirname);

// module.exports = config;
