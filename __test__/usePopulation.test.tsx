// テスト用ライブラリ
import { cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { setupServer } from "msw/node";

// テスト対象
import { usePopulation } from "@/libs/ResasApi";

// テスト用データ
import population from "./apiMockData/population.json";

// APIのモックサーバーを立てる
const apiURL =
  "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear";
const handlers = [
  rest.get(
    // テスト中の以下のリクエストはこのモックサーバーに送られる
    apiURL,
    // ダミーデータ
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(population));
    }
  ),
];
const server = setupServer(...handlers);
beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => {
  server.close();
});

// テスト内容
describe("usePopulationのテスト", () => {
  test("APIから正常に取得できるか確認", async () => {
    // usePopulation実行
    const { result } = renderHook(() => usePopulation(1));

    // isLoadingがfalseになるまで待つ
    await waitFor(() => {
      const isLoading = result.current.isLoading;
      expect(isLoading).toBe(false);
    });

    // APIのレスポンスから総人口を切り出したもの
    const expectedResponse = population.result.data[0].data;
    // データがきちんと整形されて取得されているか確認
    expect(result.current.population()).toStrictEqual(expectedResponse);
  });
});
