// テスト用ライブラリ
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

// テスト対象
import { isRESASError } from "@/libs/ResasApi";

// モックデータ
import data from "./apiMockData/resasErrorResponses.json";

afterEach(() => {
  cleanup();
});

// テスト内容
describe("RESAS-APIのエラーが検出できるか", () => {
  test("400 Bad Request", () => {
    const expectedError = {
      statusCode: 400,
      errorMessage: "Some Error Occured.",
    };
    expect(isRESASError(data[400])).toStrictEqual(expectedError);
  });

  test("403 Forbidden", () => {
    const expectedError = {
      statusCode: 403,
      errorMessage: "Forbidden.",
    };
    expect(isRESASError(data[403])).toStrictEqual(expectedError);
  });
});
