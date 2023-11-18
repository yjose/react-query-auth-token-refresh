/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setup.ts"],
  testEnvironmentOptions: {
    url: "https://test-api.example.com",
  },
};
