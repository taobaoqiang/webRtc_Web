<template>
  <div
    class="flex-between-con w100 h100"
    @click="casd()"
  >
    <p class="table w95 co-ff fw-700">已签到</p>

    <div class="w100 h55 ov-auto">
      <sign
        :table-data="tableData"
        class="w100"
      ></sign>
    </div>

    <!-- <process
      style="height:80px;"
      class="w100"
    ></process> -->

    <div
      class="w100 flex-around-shrink ov-auto bottom"
      v-if='flag'
    >
      <show-process
        :ids='1'
        class="show flex-none"
        :rate="rate_01"
        :colors="colors[0]"
        ref='process'
      ></show-process>
      <show-process
        :ids='2'
        class="show flex-none"
        :rate="rate_02"
        :colors="colors[1]"
        ref='process01'
      ></show-process>
      <show-process
        :ids='3'
        class="show flex-none"
        :rate="rate_03"
        :colors="colors[2]"
        ref='process02'
      ></show-process>
    </div>
  </div>
</template>
<script>
import sign from "../../components/steup_01";
import showProcess from "../../components/process_com_highcharts";
// import process from "../../components/process_com";
export default {
  components: {
    sign,
    showProcess
  },
  data() {
    return {
      flag: false,
      colors: [
        [
          [0, "#9265E9"], // end

          [1, "#6190F9"] // start
        ],
        [
          [0, "#E2812B"], // end
          [1, "#E85143"] // start
        ],
        [
          [0, "#13A4C5"], // end
          [1, "#07C27F"] // start
        ]
      ],
      rate_01: {
        num: 0,
        them: "",
        data: "",
        total: 0
      },
      rate_02: {
        num: 0,
        them: "",
        data: "",
        total: 0
      },
      rate_03: {
        num: 0,
        them: "",
        data: "",
        total: 0
      },

      message: "",
      tableData: ""
    };
  },
  computed: {
    states() {
      return this.$store.state.meeting_status;
    }
  },
  watch: {
    states(ne, ol) {
      this.init(ne);
    }
  },
  methods: {
    init(res) {
      // 签到人数
      if (res.data[0].status !==2 || !res.sign) return;
      this.tableData = res.sign.map((el, index) => {
        return { name: el.name };
      });

      // 进度统计应到
      this.rate_01 = {
        num: res.required,
        them: res.required + "人",
        data: "应到",
        total: res.required
      };
      // 进度统计实到
      this.rate_02 = {
        num: res.sign_number,
        them: res.sign_number + "人",
        data: "实到",
        total: res.required
      };
      // 进度统计占比
      this.rate_03 = {
        num: res.sign_number,
        them: parseInt((res.sign_number / res.required)*100) + "%",
        data: "占比",
        total: res.required
      };
      this.flag = true;

      // 调用子组件
      setTimeout(() => {
        this.$refs.process.update();
        this.$refs.process01.update();
        this.$refs.process02.update();
      }, 100);
    }
  },
  created() {}
};
</script>
<style scoped>
.table {
  line-height: 5.83rem;
  background: rgba(80, 159, 255, 1);
  margin: 0 auto;
  font-size: 2.33rem;
  text-align: left;
  text-indent: 1em;
  border-radius: 1rem;
}

.items {
  margin: 0 auto;
}

.show {
  width: 300px;
  height: 300px;
}
.bottom {
  height: 300px;
  width: 100%;
}
</style>
