// グラフ描画ライブラリの読み込み
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type Props = {
  chartOptions: Highcharts.Options;
};

const Chart: React.FC<Props> = (prop) => {
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={prop.chartOptions} />
    </>
  );
};

export default Chart;
