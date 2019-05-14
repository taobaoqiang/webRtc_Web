<template>
  <div
    :id="'myChart'+ids"
    class="h100 w100"
  >

  </div>
</template>


<script>
export default {
  props: ["colors", "ids", "rates"],
  name: "process",
  data() {
    return {
      option: {
        // backgroundColor: "#061A42",
        // color: [colors], //进度条颜色

        xAxis: [
          {
            show: false
          },
          //由于下边X轴已经是百分比刻度了,所以需要在顶部加一个X轴,刻度是金额,也隐藏掉
          {
            show: false
          }
        ],
        grid: {
          left: "0",
          right: "20"
        },
        yAxis: {
          type: "category",

          axisLabel: {
            show: false //让Y轴数据不显示
          },
          itemStyle: {},
          axisTick: {
            show: false //隐藏Y轴刻度
          },
          axisLine: {
            show: false //隐藏Y轴线段
          }
        },
        series: [
          //背景色--------------------我是分割线君------------------------------//
          {
            show: true,
            type: "bar",
            barGap: "-100%",
            barWidth: "20%", //统计条宽度
            itemStyle: {
              normal: {
                barBorderRadius: 100,
                color: "rgba(102, 102, 102,0.5)"
              }
            },
            z: 1,
            data: [100]
          },
          //蓝条--------------------我是分割线君------------------------------//
          {
            show: true,
            type: "bar",
            barGap: "-100%",
            barWidth: "20%", //统计条宽度
            itemStyle: {
              normal: {
                barBorderRadius: 100,
                color: this.colors
              }
            },
            max: 1,

            labelLine: {
              show: false
            },
            z: 2,
            data: [this.rates]
          }
        ]
      },
      myChart: ""
    };
  },
  mounted() {
    this.update();
  },
  computed: {
    isUpdate() {
      return this.rates;
    }
  },
  watch: {
    isUpdate() {
      this.update();
    }
  },

  methods: {
    initBar() {
      let dom = document.getElementById("myChart" + this.ids);

        this.myChart = this.Echarts.init(dom);
    },
    // 更新视图
    update() {
      this.initBar();
      this.option.series[1].data = [this.rates];
      this.option.series[1].itemStyle.normal.color = this.colors;
      this.myChart.setOption(this.option);
    }
  }
};
</script>

<style scoped>
.show {
  width: 500px;
  height: 500px;
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>
