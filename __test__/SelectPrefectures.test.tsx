// テスト用ライブラリ
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

// テスト対象
import SelectPrefectures from "@/components/SelectPrefectures";
import { SWRConfig } from "swr";

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
