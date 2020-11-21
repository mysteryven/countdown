module.exports = {
    verbose: true,
    clearMocks: false,
    collectCoverage: false,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    reporters: ["default"],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.test.json',
            isolatedModules: true
        }
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    moduleDirectories: ['node_modules', 'include'],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/__mocks__/file-mock.js",
        "\\.(css|less|sass|scss)$": "<rootDir>/test/__mocks__/object-mock.js",
        "^utils(.*)$": "<rootDir>/utils/$1"
    },
    testMatch: ['<rootDir>/**/**/*.test.(js|jsx|ts|tsx)'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    }
};
