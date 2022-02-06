// テスト用ライブラリ
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";
import httpMocks from "node-mocks-http";
import { NextApiRequest, NextApiResponse } from "next";

// テスト対象
import prefecutresApiRoute from "@/pages/api/prefectures";
// モックデータ
import prefectures from "../apiMockData/prefectures.json";
import resasResponses from "../apiMockData/resasErrorResponses.json";

// APIのモックサーバーを立てる
const apiURL = "https://opendata.resas-portal.go.jp/api/v1/prefectures";
const handlers = [
  rest.get(apiURL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(prefectures));
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
describe("/api/prefecturesでResasApiを叩いて都道府県一覧を返す内部API", () => {
  test("正しく都道府県が取得できることを確認", async () => {
    const mockReq = httpMocks.createRequest<NextApiRequest>();
    const mockRes = httpMocks.createResponse<NextApiResponse>();
    await prefecutresApiRoute(mockReq, mockRes);

    expect(mockRes._getJSONData()).toStrictEqual(prefectures.result);
  });

  test("RESAS APIのエラーがある場合はエラーを返すことを確認", async () => {
    const error = resasResponses["403"];
    // エラーになるようにモックサーバーを上書き
    server.use(
      rest.get(apiURL, (req, res, ctx) => res(ctx.status(200), ctx.json(error)))
    );

    const mockReq = httpMocks.createRequest<NextApiRequest>();
    const mockRes = httpMocks.createResponse<NextApiResponse>();
    await prefecutresApiRoute(mockReq, mockRes);

    expect(mockRes._getStatusCode()).toStrictEqual(Number(error.statusCode));
    expect(mockRes._getStatusMessage()).toStrictEqual(error.message);
  });

  test("API通信時に何らかの障害発生した場合にエラーを返していることを確認", async () => {
    // エラーになるようにモックサーバーを上書き
    server.use(rest.get(apiURL, (req, res, ctx) => res(ctx.status(500))));

    const mockReq = httpMocks.createRequest<NextApiRequest>();
    const mockRes = httpMocks.createResponse<NextApiResponse>();
    await prefecutresApiRoute(mockReq, mockRes);

    expect(mockRes._getStatusCode()).toStrictEqual(500);
    expect(mockRes._getStatusMessage()).not.toBeNull();
  });
});
