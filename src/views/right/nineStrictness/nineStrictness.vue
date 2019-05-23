<template>
  <div class="w100 h100">
    <div
      class="h70 ov-auto"
      v-html="content"
    >

    </div>
    <div
      class="w100 h30 flex-around-shrink ov-auto"
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
import axios from ".././../../fetch/url";
import showProcess from "../../../components/process_com_highcharts";

export default {
  components: {
    showProcess
  },
  data() {
    return {
      content: "",
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
      }
    };
  },
  computed: {
    states() {
      return this.$store.state.meeting_status;
    }
  },
  watch: {
    states(ne, ol) {
      this.initProcess(ne);
    }
  },
  created() {
    this.init();
  },
  mounted() {
    this.initProcess(this.$store.state.meeting_status);
  },
  methods: {
    async init() {
      let data = {
        meeting_id: this.meeting_id,
        flow_step: this.$route.query.flow_step
      };

      let res = await axios.mettingFlow(data);
      this.content = res.data.data[0].flow_content;
    },

    initProcess(res) {
      // 签到人数
      if (res.data[1].status !== 2) return;

      // 进度统计应到
      this.rate_01 = {
        num: res.sign_number,
        them: res.sign_number + "人",
        data: "实到",
        total: res.sign_number
      };
      // 进度统计实到
      this.rate_02 = {
        num: res.confirm,
        them: res.confirm + "人",
        data: "已阅",
        total: res.sign_number
      };
      // 进度统计占比
      this.rate_03 = {
        num: res.confirm,
        them: parseInt((res.sign_number ==0 ? 0 :  res.confirm / res.sign_number ) * 100) + "%",
      
        data: "占比",
        total: res.sign_number
      };
      this.flag = true;

      // 调用子组件
      setTimeout(() => {
        this.$refs.process.update();
        this.$refs.process01.update();
        this.$refs.process02.update();
      }, 100);
    }
  }
};
</script>

<style scoped>
</style>

