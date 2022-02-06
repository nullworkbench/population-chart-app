// グラフ描画ライブラリの読み込み
import Highcharts, { ChartOptions } from "highcharts";
import HighchartsReact from "highcharts-react-official";

type Props = {
  chartOptions: Highcharts.Options;
};

// 入力をカンマ区切りの数値にして返す
const thousandsSepFormat = (str: string | number) =>
  Highcharts.numberFormat(Number(str), 0, ",", ",");

// デフォルトのグラフの設定
const defaultChartOptions: Highcharts.Options = {
  // ホバー時に表示される情報
  tooltip: {
    useHTML: true,
    headerFormat: '<table><tr><th colspan="2">{point.x}年</th></tr>',
    pointFormatter: function () {
      return `<tr>
      <td><span style="color:${this.color}">&#9679; </span>
      ${this.series.name}: </td>
      <td style="text-align: right">
        <b>${thousandsSepFormat(this.y ?? 0)}人</b>
      </td></tr>`;
    },
    footerFormat: "</table>",
  },
  // グラフタイトル
  title: { text: "都道府県別の総人口推移", margin: 30 },
  subtitle: { text: "出典：内閣府 地方創生推進室 地域経済分析システム" },
  chart: { marginLeft: 80 },
  // X軸のラベル
  xAxis: {
    title: { text: "年", align: "high", offset: 0, x: 10, y: 25 },
  },
  yAxis: {
    title: {
      text: "人口数",
      rotation: 0,
      align: "high",
      offset: 0,
      x: -15,
      y: -10,
    },
    labels: {
      formatter: function () {
        return thousandsSepFormat(this.value);
      },
    },
  },
};

const Chart: React.FC<Props> = (props) => {
  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          ...defaultChartOptions,
          ...props.chartOptions,
        }}
      />
    </>
  );
};

export default Chart;
