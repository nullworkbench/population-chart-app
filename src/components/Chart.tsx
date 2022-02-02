// グラフ描画ライブラリの読み込み
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// 総人口を取得する関数
import { Prefecture, Population, getPopulation } from "@/libs/ResasApi";
import { useState } from "react";

type Props = {
  selectedPrefs: Prefecture[];
};

const Chart: React.FC<Props> = (prop) => {
  // グラフに表示する都道府県のprefCode
  const prefs = prop.selectedPrefs;

  // グラフの設定
  const [chartOptions, setChartOptions] = useState({
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

  // prefCodeから総人口を取得
  async function getPopulations() {
    for (const pref of prefs) {
      // すでにグラフに追加されているものはスキップ
      if (chartOptions.series.find((series) => series.name == pref.prefName))
        continue;
      // 情報を取得してグラフへ描画
      const population = await getPopulation(pref.prefCode);
      if (population) {
        updateChart(population);
      }
    }
  }

  function updateChart(newData: Population) {
    setChartOptions({
      ...chartOptions,
      series: [
        ...chartOptions.series,
        {
          type: "line",
          name: `${newData.prefCode}`,
          data: newData.data.map((d) => d.value),
        },
      ],
    });
  }

  return (
    <>
      <button onClick={() => getPopulations()}>updateChart</button>
      <div>
        {prefs.map((pref, idx) => (
          <span key={idx}>{pref.prefCode} </span>
        ))}
      </div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </>
  );
};

export default Chart;
