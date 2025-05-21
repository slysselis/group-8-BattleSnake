// jest.config.js
export default {
  // Specify that we're using ESM
  type: 'module',
  
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
  
  // For ESM support
  extensionsToTreatAsEsm: ['.js'],
  
  // Required for ES modules with Jest
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  
  // Transform is not needed for ESM modules in Node.js
  transform: {},
  
  // Set this higher if tests timeout
  testTimeout: 10000
};
