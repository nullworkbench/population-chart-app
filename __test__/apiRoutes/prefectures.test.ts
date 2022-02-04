// テスト用ライブラリ
import { cleanup, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";
import httpMocks from "node-mocks-http";
import { NextApiRequest, NextApiResponse } from "next";

// テスト対象
import prefecutresApiRoute from "@/pages/api/prefectures";
import prefectures from "../apiMockData/prefectures.json";

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
  test("正しく取得できる場合", async () => {
    const mockReq = httpMocks.createRequest<NextApiRequest>();
    const mockRes = httpMocks.createResponse<NextApiResponse>();
    await prefecutresApiRoute(mockReq, mockRes);
    expect(mockRes._getJSONData()).toStrictEqual(prefectures.result);
  });
});
