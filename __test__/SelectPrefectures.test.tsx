// テスト用ライブラリ
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

// テスト対象
import SelectPrefectures from "@/components/SelectPrefectures";
import { SWRConfig } from "swr";

describe("コンポーネントを描画", () => {
  it("47都道府県のチェックボックスが描画される", async () => {
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <SelectPrefectures selectedPrefs={[]} setSelectedPrefs={() => {}} />
      </SWRConfig>
    );

    expect(await screen.findByText("北海道"));
  });
});
