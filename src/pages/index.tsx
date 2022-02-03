import type { NextPage } from "next";
import { useState } from "react";

import { Prefecture, Population, getPopulation } from "@/libs/ResasApi";
import SelectPrefectures from "@/components/SelectPrefectures";
import Chart from "@/components/Chart";

const Home: NextPage = () => {
  // 選択中の都道府県のPrefCode
  const [selectedPrefs, setSelectedPrefs] = useState<Prefecture[]>([]);

  // グラフの設定
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
    //グラフタイトル
    title: { text: "都道府県別の総人口推移" },
    subtitle: { text: "出典：内閣府 地方創生推進室 地域経済分析システム" },
    // X軸のラベル
    xAxis: {
      categories: ["A", "B", "C"],
    },
    yAxis: { title: { text: "総人口" } },
    // グラフ
    series: [
      { type: "line", name: "graph1", data: [1, 2, 3] },
      { type: "line", name: "graph2", data: [3, 2, 1] },
    ],
  });

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

  // グラフの更新
  function updateChart() {}

  // 総人口を取得する関数
  function getPopulation(prefCode: number) {}

  return (
    <>
      {/* 都道府県一覧 */}
      <SelectPrefectures
        selectedPrefs={selectedPrefs}
        handleCheckboxChange={handleCheckboxChange}
      />
      {/* グラフ */}
      <Chart chartOptions={chartOptions} />
    </>
  );
};

export default Home;
