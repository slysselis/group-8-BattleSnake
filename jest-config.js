// jest.config.js
export default {
  // Use Node.js environment
  testEnvironment: 'node',
  
  // Look for test files in any folder with these patterns
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  
  // Collect coverage information
  collectCoverage: true,
  
  // Directory where Jest should output coverage files
  coverageDirectory: 'coverage',
  
  // Indicates which files should be tested for coverage
  collectCoverageFrom: [
    '*.js',
    '!jest.config.js',
    '!server.js',
    '!node_modules/**'
  ],
  
  // Transform ESM imports for Jest
  transform: {},
  
  // ESM support
  extensionsToTreatAsEsm: ['.js'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
};