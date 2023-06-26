module.exports = {
  displayName: "calendar",
  preset: "react-native",
  resolver: "@nx/jest/plugins/resolver",
  moduleFileExtensions: ["ts", "js", "html", "tsx", "jsx"],
  setupFilesAfterEnv: ["<rootDir>/test-setup.ts"],
  moduleNameMapper: {
    "\\.svg$": "@nx/react-native/plugins/jest/svg-mock",
  },
};
