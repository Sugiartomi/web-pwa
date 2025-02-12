import React from "react";
import Highcharts from "highcharts";

class PieChartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [
        {
          name: "Assets( % )",
          data: props.dataChart,
        },
      ],
    };
  }

  highChartsRender() {
    Highcharts.chart({
      chart: {
        type: "pie",
        renderTo: "atmospheric-composition-1",
      },
      credits: {
        enabled: false,
      },
      title: {
        verticalAlign: "middle",
        floating: true,
        text: " ",
        style: {
          fontSize: "12px",
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            format: "{point.name}",
          },
          innerSize: "70%",
        },
      },
      series: this.state.series,
    });
  }

  componentDidMount() {
    this.highChartsRender();
  }

  render() {
    return <div id="atmospheric-composition-1" className="p-1" style={{ height: "260px" }} />;
  }
}

export default PieChartComponent;
