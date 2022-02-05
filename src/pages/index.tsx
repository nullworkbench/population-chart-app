import type { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";

import { Prefecture, Population, getPopulation } from "@/libs/ResasApi";
import SelectPrefectures from "@/components/SelectPrefectures";
import Chart from "@/components/Chart";
import Highcharts from "highcharts";

const Home: NextPage = () => {
  // 選択中の都道府県のPrefCode
  const [selectedPrefs, setSelectedPrefs] = useState<Prefecture[]>([]);

  // グラフの設定
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({});

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
      <SelectPrefsWrapper>
        <SelectPrefectures handleCheckboxChange={handleCheckboxChange} />
      </SelectPrefsWrapper>

      <ChartWrapper>
        {/* 都道府県を選択していないときは選択を促すメッセージを表示 */}
        <SelectPrefsAlert className={selectedPrefs.length == 0 ? "show" : ""}>
          <p>都道府県を選択すると、ここに総人口推移のグラフが表示されます。</p>
        </SelectPrefsAlert>
        {/* グラフ */}
        <Chart chartOptions={chartOptions} />
      </ChartWrapper>
    </>
  );
};

const SelectPrefsWrapper = styled.div`
  margin-bottom: 2rem;
`;

const ChartWrapper = styled.div`
  position: relative;
`;

const SelectPrefsAlert = styled.div`
  // flex
  display: flex;
  justify-content: center;
  align-items: center;
  // position
  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;
  // size
  width: 100%;
  height: 103%;
  // style
  background: #f1f1f1;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;

  // transition
  transition: opacity 0.4s, visibility 0.4s;
  opacity: 0;
  visibility: hidden;
  &.show {
    opacity: 1;
    visibility: visible;
  }
`;

export default Home;
