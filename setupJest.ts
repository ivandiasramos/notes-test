import 'jest-preset-angular/setup-jest';

module.exports = {
    preset: "ts-jest",
    globals: {
      crypto: {
        getRandomValues: (arr: []) => require("crypto-js").randomBytes(arr.length),
      },
    },
};