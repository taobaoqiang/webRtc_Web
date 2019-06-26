<template>
  <div
    :id="'con'+ids"
    class="show"
  >

  </div>
</template>

<script>
import Highcharts from "highcharts";

export default {
  name: "hicharts",
  props: ["ids", "rate", "colors"],
  data() {
    return {
      chart: "",
      option: {
        chart: {
          type: "solidgauge",
          height: "110%"
        },
        title: {
          text: this.rate.them,
          style: {
            fontSize: "28px",
            fontWeight: 700,
            color: "#509FFF"
          },
          y: 180
        },
        tooltip: { enabled: false },
        pane: {
          startAngle: -125,
          endAngle: 260,
          background: {
            // Track for Exercise
            outerRadius: "87%",
            innerRadius: "63%",
            backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1])
              .setOpacity(0)
              .get(),
            borderWidth: 0
          }
        },
        credits: {
          enabled: false
        },
        yAxis: {
          min: 0,
          max: 100,
          lineWidth: 0,
          tickPositions: [],

          title: {
            text: this.rate.data,
            style: {
              fontSize: "16px",
              fontWeight: 700,
              color: "#999"
            },
            y: 80
          }
        },

        plotOptions: {
          solidgauge: {
            dataLabels: {
              enabled: false
            },
            linecap: "round",
            stickyTracking: false,
            rounded: true
          }
        },

        series: [
          {
            name: "实到",
            data: [
              {
                color: "#D9DBED",
                className: "linwar",
                radius: "87%",
                innerRadius: "63%",
                y: 65
              },
              {
                color: {
                  linearGradient: { x1: 1, x2: 0, y1: 0, y2: 0 },
                  stops: this.colors
                },
                radius: "87%",
                innerRadius: "63%",
                y:
                  Number(this.rate.num / this.rate.total) *
                  100 *
                  (0.65).toFixed(2)
              }
            ]
          }
        ]
      }
    };
  },

  mounted() {
    this.inits();
  },
  methods: {
    inits() {
      this.chart = new Highcharts.chart("con" + this.ids, this.option);
    },

    // 动态更新统计数据
    update() {
      this.option.title.text = this.rate.them;
      this.option.series[0].data[1].y =
        Number(this.rate.num / this.rate.total).toFixed(2) * 100 * 0.65;

      this.chart.update(this.option);
    }
  }
};
</script>
<style scoped>
.show {
  width: 300px;
  height: auto;
}
</style>