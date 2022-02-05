// テスト用ライブラリ
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

// テスト対象
import { ResasError, isResasError } from "@/libs/ResasApi";

// モックデータ
import data from "./apiMockData/resasErrorResponses.json";

afterEach(() => {
  cleanup();
});

// テスト内容
describe("RESAS-APIのエラーが検出できるか", () => {
  test("400 Bad Request", () => {
    const expectedError: ResasError = {
      statusCode: 400,
      errorMessage: "Some Error Occured.",
    };
    expect(isResasError(data[400])).toStrictEqual(expectedError);
  });

  test("403 Forbidden", () => {
    const expectedError: ResasError = {
      statusCode: 403,
      errorMessage: "Forbidden.",
    };
    expect(isResasError(data[403])).toStrictEqual(expectedError);
  });

  test("404 Not Found", () => {
    const expectedError: ResasError = {
      statusCode: 404,
      errorMessage: "404. That's an error.",
    };
    expect(isResasError(data[404])).toStrictEqual(expectedError);
  });

  test("429 Too Many Requests", () => {
    const expectedError: ResasError = {
      statusCode: 429,
      errorMessage: "Too Many Requests.",
    };
    expect(isResasError(data[429])).toStrictEqual(expectedError);
  });
});
