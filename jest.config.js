/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testMatch: [
    "**/*.test.ts"
  ],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json"
    }
  },
};