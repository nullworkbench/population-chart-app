// グラフ描画ライブラリの読み込み
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Chart: React.FC = () => {
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
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default Chart;
