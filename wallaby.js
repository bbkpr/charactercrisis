module.exports = function () {
  return {
    filesWithNoCoverageCalculated: [
      'src/**/*-dto.ts',
      'src/constants.ts',
      'src/common/errors.ts',
      'src/common/interfaces.ts',
      'src/index.tsx',
      'src/App.tsx',
      'src/utils/logger.ts',
      'test/**/*',
      'public/**/*',
      'src/config.ts',
      'src/setupTests.ts',
      'src/types.ts',
      'wallaby.conf.js'
    ],
    env: {
      type: 'node',
      runner: 'node'
    },
    testFramework: 'jest'
  };
};
