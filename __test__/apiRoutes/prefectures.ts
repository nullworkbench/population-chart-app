// テスト用ライブラリ
import { cleanup, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";

// テスト対象
import prefecutres from "@/pages/api/prefectures";

// APIのモックサーバーを立てる
const apiURL = "https://opendata.resas-portal.go.jp/api/v1/prefectures";
const handlers = [
  rest.get(
    // テスト中の以下のリクエストはこのモックサーバーに送られる
    apiURL,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          message: null,
          result: [
            {
              prefCode: 1,
              prefName: "北海道",
            },
            {
              prefCode: 2,
              prefName: "青森県",
            },
            {
              prefCode: 3,
              prefName: "岩手県",
            },
          ],
        })
      );
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
describe("/api/prefecturesでResasApiを叩いて都道府県一覧を返す内部API", () => {
  test("正しく取得できる場合", async () => {});
});
