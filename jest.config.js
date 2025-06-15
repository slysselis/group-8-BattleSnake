export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  transformIgnorePatterns: ['/node_modules/(?!chalk)/' ],
  testMatch: ['**/Tests/**/*.test.js', '**/?(*.)+(spec|test).js'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '*.js',
    '!jest.config.js',
    '!server.js',
    '!node_modules/**'
  ],
  testTimeout: 10000
};
