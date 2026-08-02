/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/src/__tests__/**/*.test.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: { jsx: "react-jsx" } }],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^next/server$": "<rootDir>/src/__tests__/__mocks__/next-server.ts",
    "^next$": "<rootDir>/src/__tests__/__mocks__/next.ts",
  },
};

module.exports = config;
