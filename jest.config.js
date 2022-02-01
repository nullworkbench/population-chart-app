module.exports = {
  // セットアップで実行する
  globalSetup: "<rootDir>/__test__/setupEnv.ts",
  // テスト対象から除外
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  // モジュールのパス指定
  moduleNameMapper: {
    "\\.(scss)$": "<rootDir>/node_modules/jest-css-modules",
    "@/(.*)": "<rootDir>/src/$1",
  },
};
