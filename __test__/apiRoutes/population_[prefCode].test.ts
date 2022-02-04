// テスト用ライブラリ
import { cleanup, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";
import httpMocks from "node-mocks-http";
import { NextApiRequest, NextApiResponse } from "next";

// テスト対象
import populationApiRoute from "@/pages/api/population/[prefCode]";
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
describe("/api/population/[prefCode]でResasApiを叩いて人口情報を返す内部API", () => {});
