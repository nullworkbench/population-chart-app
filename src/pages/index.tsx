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
    series: [],
  });

  // チェックを切り替えたとき
  function handleCheckboxChange(checked: boolean, pref: Prefecture) {
    // 引数のprefCodeと一致するものを削除する
    const _new = selectedPrefs.filter((sp) => sp != pref);
    // 選択したときは要素を追加
    if (checked) {
      _new.push(pref);
    }
    // 選択一覧を更新
    setSelectedPrefs(_new);
    // グラフを更新
    updateChart(checked, pref);
  }

  // グラフの更新
  async function updateChart(checked: boolean, newPref: Prefecture) {
    // すでにグラフに含まれていれば削除
    const filtered = chartOptions.series?.filter(
      (series) => series.name != newPref.prefName
    );

    // 新規要素の場合は人口情報を取得
    if (checked) {
      const population = await getPopulation(newPref.prefCode);

      if (population?.data) {
        const _new: Highcharts.Options = {
          ...chartOptions,
          xAxis: { categories: population.data.map((d) => String(d.year)) },
          series: [
            ...(chartOptions.series ?? []),
            {
              type: "line",
              name: newPref.prefName,
              data: population.data.map((d) => d.value),
            },
          ],
        };
        setChartOptions(_new);
      }
    } else {
      // 新規要素ではないので、削除したものを登録
      setChartOptions({ ...chartOptions, series: filtered });
    }
  }

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
