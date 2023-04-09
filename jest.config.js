module.exports = {
  roots: ['<rootDir>/src/', '<rootDir>/tests/'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/configuration/**'
  ],
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/src/(.*)': '<rootDir>/src/$1'
  },
  preset: '@shelf/jest-mongodb'
}
