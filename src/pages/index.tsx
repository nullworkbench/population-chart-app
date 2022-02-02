import type { NextPage } from "next";
import styles from "@/styles/Home.module.scss";

import SelectPrefectures from "@/components/SelectPrefectures";
import { useState } from "react";
import Chart from "@/components/Chart";

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
      {/* グラフ */}
      <Chart selectedPrefs={selectedPrefs} />
    </>
  );
};

export default Home;
