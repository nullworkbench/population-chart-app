// テスト用ライブラリ
import { cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";

// テスト対象
import { usePopulation } from "@/libs/ResasApi";

// テスト用データ
import population from "./apiMockData/population.json";

// APIのモックサーバーを立てる
const apiURL =
  "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=1&cityCode=-";
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
  test("APIから正常に取得できるか確認", async () => {});
});
