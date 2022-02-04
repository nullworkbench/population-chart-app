// グラフ描画ライブラリの読み込み
import Highcharts, { ChartOptions } from "highcharts";
import HighchartsReact from "highcharts-react-official";

type Props = {
  chartOptions: Highcharts.Options;
};

// デフォルトのグラフの設定
const defaultChartOptions: Highcharts.Options = {
  //グラフタイトル
  title: { text: "都道府県別の総人口推移", margin: 30 },
  subtitle: { text: "出典：内閣府 地方創生推進室 地域経済分析システム" },
  chart: { marginLeft: 80 },
  // X軸のラベル
  xAxis: {
    title: { text: "年度", align: "high", offset: 0, x: 10, y: 25 },
  },
  yAxis: {
    title: {
      text: "人口数",
      rotation: 0,
      align: "high",
      offset: 0,
      x: -12,
      y: -15,
    },
    labels: {
      formatter: function () {
        return Highcharts.numberFormat(Number(this.value), 0, ",", ",");
      },
    },
  },
};

const Chart: React.FC<Props> = (prop) => {
  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          ...defaultChartOptions,
          ...prop.chartOptions,
        }}
      />
    </>
  );
};

export default Chart;
