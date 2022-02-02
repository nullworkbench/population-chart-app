// グラフ描画ライブラリの読み込み
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// 総人口を取得する関数
import { usePopulation } from "@/libs/ResasApi";

type Props = {
  selectedPrefs: number[];
};

const Chart: React.FC<Props> = (prop) => {
  // グラフに表示する都道府県のprefCode
  const prefCodes = prop.selectedPrefs;

  // prefCodeから総人口を取得
  const { population, isLoading, isError } = usePopulation(34);

  if (!isLoading) {
    console.log(population());
  }

  const chartOptions = {
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
  };

  return (
    <>
      <div>
        {prefCodes.map((code, idx) => (
          <span key={idx}>{code} </span>
        ))}
      </div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </>
  );
};

export default Chart;
