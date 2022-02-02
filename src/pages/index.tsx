import type { NextPage } from "next";
import styles from "@/styles/Home.module.scss";

import SelectPrefectures from "@/components/SelectPrefectures";
import { useState } from "react";

const Home: NextPage = () => {
  // 選択中の都道府県のPrefCode
  const [selectedPrefs, setSelectedPrefs] = useState<number[]>([]);

  // チェックを切り替えたとき
  function handleCheckboxChange(checked: boolean, prefCode: number) {
    // 引数のprefCodeと一致するものを削除する
    const _new = selectedPrefs.filter((pref) => pref != prefCode);
    // 選択したときは要素を追加
    if (checked) {
      _new.push(prefCode);
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
      <div>
        <p>選択中の都道府県</p>
        {selectedPrefs.map((pref, prefIdx) => (
          <span key={prefIdx}>{pref} </span>
        ))}
      </div>
    </>
  );
};

export default Home;
