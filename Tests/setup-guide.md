# Jest and ESLint-Jest Setup Guide

This guide will help you set up Jest and ESLint-Jest for your Battlesnake project.

## Installation

First, install the required dependencies:

```bash
npm install --save-dev jest eslint eslint-plugin-jest
```

## Configuration Files

The following configuration files have been created for you:

1. `jest.config.js` - Jest configuration file
2. `.eslintrc.json` - ESLint configuration with Jest plugin
3. Package.json scripts additions

### Add to package.json

Make sure your package.json includes these scripts:

```json
"scripts": {
  "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js",
  "test:watch": "node --experimental-vm-modules node_modules/jest/bin/jest.js --watch",
  "lint": "eslint ."
},
"devDependencies": {
  "eslint": "^8.56.0",
  "eslint-plugin-jest": "^27.6.0",
  "jest": "^29.7.0"
},
"type": "module"
```

## Test Files

The following test files have been created:

1. `__tests__/preventBackwardsMovement.test.js`
2. `__tests__/preventBorderCollision.test.js`
3. `__tests__/preventSelfCollision.test.js`
4. `__tests__/preventSnakeCollision.test.js`
5. `__tests__/headToHead.test.js`
6. `__tests__/moveTowardFood.test.js`
7. `__tests__/index.test.js`

## Running Tests

To run all tests:

```bash
npm test
```

To run tests in watch mode (tests will re-run when files change):

```bash
npm run test:watch
```

To run a specific test file:

```bash
npm test -- __tests__/preventBackwardsMovement.test.js
```

## Running ESLint

To run ESLint on your project:

```bash
npm run lint
```

## Notes on ESM Support

This project uses ECMAScript modules (ESM). The Jest configuration has been set up to support ESM imports with the following settings:

```javascript
transform: {},
extensionsToTreatAsEsm: ['.js'],
moduleNameMapper: {
  '^(\\.{1,2}/.*)\\.js$': '$1'
}
```

And we're using the `--experimental-vm-modules` flag when running Jest.

## Test Coverage

The configuration includes test coverage reports. After running the tests, you'll find a coverage report in the `coverage` directory.