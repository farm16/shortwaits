module.exports = {
  displayName: "shortwaits-client",
  preset: "react-native",

  resolver: "@nrwl/jest/plugins/resolver",
  moduleFileExtensions: ["ts", "js", "html", "tsx", "jsx"],
  setupFilesAfterEnv: ["<rootDir>/test-setup.ts"],
  moduleNameMapper: {
    ".svg": "@nx/react-native/plugins/jest/svg-mock",
  },
};
