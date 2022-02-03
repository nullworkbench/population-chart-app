// テスト用ライブラリ
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

// テスト対象
import { isRESASError } from "@/libs/ResasApi";

afterEach(() => {
  cleanup();
});

// テスト内容
describe("RESAS-APIのエラーが検出できるか", () => {
  // テスト１
  test("", async () => {});
});
