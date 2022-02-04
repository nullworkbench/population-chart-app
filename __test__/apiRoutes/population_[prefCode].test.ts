// テスト用ライブラリ
import { cleanup, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";
import httpMocks from "node-mocks-http";
import { NextApiRequest, NextApiResponse } from "next";
import { Population } from "@/libs/ResasApi";

// テスト対象
import populationApiRoute, {
  ExNextApiRequest,
} from "@/pages/api/population/[prefCode]";
// モックデータ
import population from "../apiMockData/population.json";
import resasResponses from "../apiMockData/resasErrorResponses.json";

// APIのモックサーバーを立てる
const apiURL =
  "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear";
const handlers = [
  rest.get(apiURL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(population));
  }),
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
describe("/api/population/[prefCode]でResasApiを叩いて人口情報を返す内部API", () => {
  const prefCode = 1;

  test("正しく総人口が取得できることを確認", async () => {
    // テストに使用するリクエスト / レスポンス
    const mockReq = httpMocks.createRequest<ExNextApiRequest>({
      query: { prefCode },
    });
    const mockRes = httpMocks.createResponse<NextApiResponse>();

    await populationApiRoute(mockReq, mockRes);

    // 期待されるレスポンス
    const expectedResponse: Population = {
      prefCode,
      data: population.result.data[0].data, // 総人口
    };

    expect(mockRes._getJSONData()).toStrictEqual(expectedResponse);
  });

  test("RESAS APIのエラーがある場合はエラーを返すことを確認", async () => {
    const error = resasResponses["403"];
    // エラーになるようにモックサーバーを上書き
    server.use(
      rest.get(apiURL, (req, res, ctx) => res(ctx.status(200), ctx.json(error)))
    );

    // テストに使用するリクエスト / レスポンス
    const mockReq = httpMocks.createRequest<ExNextApiRequest>({
      query: { prefCode },
    });
    const mockRes = httpMocks.createResponse<NextApiResponse>();

    await populationApiRoute(mockReq, mockRes);

    expect(mockRes._getStatusCode()).toStrictEqual(Number(error.statusCode));
    expect(mockRes._getStatusMessage()).toStrictEqual(error.message);
  });

  test("API通信時に何らかの障害発生した場合にエラーを返していることを確認", async () => {
    // エラーになるようにモックサーバーを上書き
    server.use(rest.get(apiURL, (req, res, ctx) => res(ctx.status(500))));

    // テストに使用するリクエスト / レスポンス
    const mockReq = httpMocks.createRequest<ExNextApiRequest>({
      query: { prefCode },
    });
    const mockRes = httpMocks.createResponse<NextApiResponse>();

    await populationApiRoute(mockReq, mockRes);

    expect(mockRes._getStatusCode()).toStrictEqual(500);
    expect(mockRes._getStatusMessage()).not.toBeNull();
  });
});
