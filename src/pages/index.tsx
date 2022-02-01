import type { NextPage } from "next";
import styles from "@/styles/Home.module.scss";

import SelectPrefectures from "@/components/SelectPrefectures";
import { useState } from "react";

const Home: NextPage = () => {
  // 選択中の都道府県のPrefCode
  const [selectedPrefs, setSelectedPrefs] = useState<number[]>([]);

  return (
    <>
      {/* 都道府県一覧 */}
      <SelectPrefectures
        selectedPrefs={selectedPrefs}
        setSelectedPrefs={setSelectedPrefs}
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
