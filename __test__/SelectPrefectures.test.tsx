// テスト用ライブラリ
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";

// テスト対象
import SelectPrefectures from "@/components/SelectPrefectures";
import { SWRConfig } from "swr";

// APIのモックサーバーを立てる
const handlers = [
  rest.get(
    // テスト中の以下のリクエストはこのモックサーバーに送られる
    "https://opendata.resas-portal.go.jp/api/v1/prefectures",
    // ダミーデータ
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
describe("コンポーネントを描画", () => {
  // テスト１
  test("Loading...が表示される", async () => {
    // SWRのキャッシュを無効化して描画
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <SelectPrefectures selectedPrefs={[]} setSelectedPrefs={() => {}} />
      </SWRConfig>
    );
    expect(screen.getByTestId("loadingText"));
  });
});
