// テスト用ライブラリ
import {
  cleanup,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";

// テスト対象
import SelectPrefectures from "@/components/SelectPrefectures";
import { SWRConfig } from "swr";

// モックデータ
import prefectures from "./apiMockData/prefectures.json";

// APIのモックサーバーを立てる
const apiURL = "/api/prefectures";
const handlers = [
  // テスト中の以下のリクエストはこのモックサーバーに送られる
  rest.get(apiURL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(prefectures.result));
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
describe("コンポーネントを描画", () => {
  // テスト１
  test("Loading...が表示される", async () => {
    // SWRのキャッシュを無効化して描画
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <SelectPrefectures handleCheckboxChange={() => {}} />
      </SWRConfig>
    );
    expect(screen.getByTestId("loadingText"));
  });

  // テスト２
  test("47都道府県のチェックボックスが描画される", async () => {
    // SWRのキャッシュを無効化して描画
    const { asFragment } = render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <SelectPrefectures handleCheckboxChange={() => {}} />
      </SWRConfig>
    );

    // この要素が消えるまでテストを終了しないで待つ
    await waitForElementToBeRemoved(() =>
      // まずはSWRが取得中なのでLoadingが表示される
      expect(screen.getByTestId("loadingText"))
    );
    // 表示が完了すると、都道府県の情報が出る
    expect(screen.getByText("北海道"));
    expect(screen.getByText("青森県"));
    expect(screen.getByText("岩手県"));

    // 以前のテスト時のスナップショットと一致するか
    expect(asFragment()).toMatchSnapshot();
  });

  // テスト３
  test("APIからの取得時にエラーが発生した場合", async () => {
    // わざとエラーを発生させるためにモックサーバーを上書き
    server.use(
      rest.get(apiURL, (req, res, ctx) => {
        return res(ctx.status(403));
      })
    );
    // SWRのキャッシュを無効化して描画
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <SelectPrefectures handleCheckboxChange={() => {}} />
      </SWRConfig>
    );
    // この要素が消えるまでテストを終了しないで待つ
    await waitForElementToBeRemoved(() =>
      // まずはSWRが取得中なのでLoadingが表示される
      expect(screen.getByTestId("loadingText"))
    );

    // エラー文が出ていることを確認
    expect(screen.getByTestId("errorMessage"));
  });
});
