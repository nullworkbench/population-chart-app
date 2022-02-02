import type { NextPage } from "next";
import { useState } from "react";

import { Prefecture } from "@/libs/ResasApi";
import SelectPrefectures from "@/components/SelectPrefectures";
import Chart from "@/components/Chart";

const Home: NextPage = () => {
  // 選択中の都道府県のPrefCode
  const [selectedPrefs, setSelectedPrefs] = useState<Prefecture[]>([]);

  // チェックを切り替えたとき
  function handleCheckboxChange(checked: boolean, pref: Prefecture) {
    // 引数のprefCodeと一致するものを削除する
    const _new = selectedPrefs.filter((sp) => sp != pref);
    // 選択したときは要素を追加
    if (checked) {
      _new.push(pref);
    }
    // 親の配列を更新
    setSelectedPrefs(_new);
  }

  return (
    <>
      {/* 都道府県一覧 */}
      <SelectPrefectures
        selectedPrefs={selectedPrefs}
        handleCheckboxChange={handleCheckboxChange}
      />
      {/* グラフ */}
      <Chart selectedPrefs={selectedPrefs} />
    </>
  );
};

export default Home;
