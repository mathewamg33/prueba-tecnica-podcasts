module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['./jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
}
