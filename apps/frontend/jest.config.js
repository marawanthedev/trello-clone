module.exports = {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.jsx?$": "babel-jest", // Transpile JS/React
        "^.+\\.tsx?$": "babel-jest", // Transpile TS
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1", // Match Vite's alias
    },
};
