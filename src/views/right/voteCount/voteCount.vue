<template>
  <div class="w95 m-auto h100">

    <div
      class="w100 flex-around-shrink ov-auto bottom"
      v-if='flagRate'
    >
      <show-process
        :ids='"result01"'
        class="show flex-none"
        :rate="rate_01"
        :colors="colors[0]"
        ref='process'
      ></show-process>
      <show-process
        :ids='"result02"'
        class="show flex-none"
        :rate="rate_02"
        :colors="colors[1]"
        ref='process01'
      ></show-process>
      <show-process
        :ids='"result03"'
        class="show flex-none"
        :rate="rate_03"
        :colors="colors[2]"
        ref='process02'
      ></show-process>
    </div>
  </div>
</template>
<script>
import showProcess from "../../../components/process_com_highcharts";

export default {
  components: { showProcess },
  data() {
    return {
      party: "",
      flag: true,
      flagRate: false,
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
        num: "",
        them: "",
        data: "",
        total: ""
      },
      rate_02: {
        num: "",
        them: "",
        data: "",
        total: ""
      },
      rate_03: {
        num: "",
        them: "",
        data: "",
        total: ""
      },
      color: [
        "#009900",
        "#FF9933",
        "#006666",
        "#660099",
        "#66FFFF",
        "#996699",
        "#99FFCC",
        "#CCCC66",
        "#FF9933",
        "#FF99CC"
      ],
      secretary_gain: "",
      deputy_secretary_gain: "",
      commissioner_gain: ""
    };
  },
  watch: {
    apply(ne, ol) {
      console.log("父组件更新01");
      this.init(ne);
      this.initRate(ne);
    }
  },

  computed: {
    apply() {
      return this.$store.state.meeting_status;
    }
  },
  mounted() {
    let ne = this.$store.state.meeting_status;
    this.initRate(ne);
    this.init(ne);
  },
  methods: {
    // 进度

    // 初始化数据
    initRate(res) {
      // 签到人数
      if (res.data[7].status !== 2) return;

      // 进度统计应到
      this.rate_01 = {
        num: res.sign_party,
        them: res.sign_party + "人",
        data: "总人",
        total: res.sign_party
      };
      // 进度统计实到
      this.rate_02 = {
        num: res.vote_number,
        them: res.vote_number + "人",
        data: "已投",
        total: res.sign_party
      };
      // 进度统计占比
      this.rate_03 = {
        num: res.vote_number,
        them: parseInt((res.vote_number / (res.sign_party || 1)) * 100) + "%",
        data: "进度",
        total: res.sign_party
      };
      this.flagRate = true;
      // 调用子组件
      setTimeout(() => {
        this.$refs.process.update();
        this.$refs.process01.update();
        this.$refs.process02.update();
      }, 100);
    },

    init(t) {
      let ts = t;
      this.secretary_gain = ts.secretary_gain;
      this.secretary_gain.required = ts.sign_party;
      this.required = ts.sign_party;
      this.deputy_secretary_gain = ts.deputy_secretary_gain;
      this.commissioner_gain = ts.commissioner_gain;
      this.party = ts.party.length;
    },
    change() {
      this.flag = !this.flag;
      if (this.flag) {
        let tmp = this.rate;
        this.rate = this.rateSet;
        this.rateSet = tmp;
      } else {
        let tmp = this.rate;
        this.rate = this.rateSet;
        this.rateSet = tmp;
      }
    },

    // 随机颜色
    colorFn(index) {
      let data;
      if (index > 9) {
        data = this.color[Math.floor(Math.random() * 10)];
      } else {
        data = this.color[index];
      }

      return data;
    }
  }
};
</script>
<style>
.candidate {
  color: #50a0ff;
  font-weight: 700;
}
.change {
  padding: 0 2rem;
  cursor: pointer;
}
.process {
  height: 40px;
}
.vote {
  padding: 5;
}
</style>
