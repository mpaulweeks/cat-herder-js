module.exports = {
  roots: [
    "src"
  ],
  transform: {
    "^.+\\.(js|ts|tsx)$": "ts-jest"
  },
  coverageReporters: ["json", "lcov", "text", "clover", "html"],
}
