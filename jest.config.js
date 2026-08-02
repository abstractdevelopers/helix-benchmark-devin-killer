/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/src/__tests__/**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: { jsx: "react-jsx" } }],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^next/server$": "<rootDir>/__mocks__/next-server.js",
  },
};

module.exports = config;