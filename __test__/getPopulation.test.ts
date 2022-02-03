// テスト用ライブラリ
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";

// テスト対象
import { getPopulation } from "@/libs/ResasApi";

// テスト用データ
import population from "./apiMockData/population.json";
const prefCode = 1;

// ResasApiのエラーレスポンス
import resasResponses from "./apiMockData/resasErrorResponses.json";

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
describe("getPopulationのテスト", () => {
  test("APIから正常に取得できるか確認", async () => {
    // getPopulation実行
    const res = await getPopulation(prefCode);

    // APIのレスポンスから総人口を切り出したもの
    const expectedResponse = {
      prefCode: prefCode,
      data: population.result.data[0].data,
    };

    expect(res).toStrictEqual(expectedResponse);
  });

  test("API通信にエラーがあった場合にvoidを返すことを確認", async () => {
    // エラーを起こすためにモックサーバーを上書き
    server.use(
      rest.get(apiURL, (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );
    // getPopulation実行
    const res = await getPopulation(prefCode);

    expect(res).toBeUndefined();
  });

  test("ResasApi独自のエラーがあった場合にvoidを返すことを確認", async () => {
    // エラーを起こすためにモックサーバーを上書き
    server.use(
      rest.get(apiURL, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(resasResponses["403"]));
      })
    );
    // getPopulation実行
    const res = await getPopulation(prefCode);

    expect(res).toBeUndefined();
  });
});