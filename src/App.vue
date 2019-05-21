<template>
  <div
    id="app"
    class="h100 w100  flex-center-warp-noalign"
  >
    <p class="fz-2rem co-ff   fw-700  item-time">会议进行时间 <span class="col-green">{{timeIng}}</span></p>
    <div class="h125 w100">

      <div class='top flex-center co-ff w100 h100'>

        <p class="fz-4rem fw-700">{{tips}}</p>
      </div>

      <!-- <div class="flex-item-end co-ff fz-2rem h125 pf top-right">
        <div class="flex-center-warp  w50">
          <img
            class="mute"
            src="../public/assets/image/静音@2x.png"
          >
          <p class="mg-l-5">全场静音</p>
        </div>
        <div class="flex-center-warp w50">
          <img
            class="mute"
            src="../public/assets/image/结束@2x.png"
          >
          <p class="mg-l-5">关闭会议</p>
        </div>
      </div> -->

      <div class="flex-item-end fw-700 co-ff fz-2rem h125 pf top-right">
        <div class="flex-center  w50">
          <img
            class="mute"
            src="../public/assets/voteicon01.png"
          >
          <div class="flex-center-warp">
            <p class="mg-l-5 fz-25rem col-blue">{{should}}</p>
            <p class="mg-l-5 fz-15rem">应到</p>
          </div>
        </div>
        <div class="flex-center  w50">
          <img
            class="mute"
            src="../public/assets/voteicon02.png"
          >
          <div class="flex-center-warp">
            <p class="mg-l-5 fz-25rem col-orange">{{actually}}</p>
            <p class="mg-l-5 fz-15rem">实到</p>
          </div>
        </div>
        <div class="flex-center  w50">
          <img
            class="mute"
            src="../public/assets/voteicon03.png"
          >
          <div class="flex-center-warp ">
            <p class="mg-l-5 fz-25rem col-green">{{proportion}}</p>
            <p class="mg-l-5 fz-15rem">占比</p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="router flex-center"
      v-cloak
    >
      <router-view />

    </div>
  </div>
</template>
<script>
// import WS from "./worker/worker";

export default {
  data() {
    return {
      should: "", //应到
      actually: "", //实到
      proportion: "", //
      tips: "",
      timeIng: "",
      watchFlag: true,
      timer: ""
    };
  },
  computed: {
    meetingTips() {
      return this.$store.state.meeting_status;
    }
  },
  watch: {
    meetingTips(ne) {
      this.tips = ne.meeting_name;
      this.should = ne.required + "人";
      this.actually = ne.sign_number + "人";
      this.proportion = parseInt((ne.sign_number / ne.required) * 100) + "%";
      if (this.watchFlag && ne.data[0].status != 1) { 
        this.timer = window.setInterval(() => {
          let time = (new Date().getTime() - new Date(ne.start_time).getTime()) / 1000; //秒
          let h = parseInt(time / 60 / 60); //小时
          let m = parseInt((time - h * 60 * 60) / 60); //分
          let s = parseInt(time - h * 60 * 60 - m * 60); //秒
   
          this.timeIng =
            (h < 9 ? "0" + h : h) +
            " 小时 " +
            (m < 9 ? "0" + m : m) +
            " 分钟 " +
            (s < 9 ? "0" + s : s) +
            " 秒 ";
        }, 1000);

        this.watchFlag = false;
      }
    }
  },
  mounted() {
    // this.reslve();
    // this.send();

    // console.log(WS);
  },
  methods: {
    send() {
      WS.sendWS();
    },
    reslve() {
      WS.messageWS();
    },
    closeFn() {
      WS.closeFn();
    }
  },
  beforeDestroy() {
    console.log("组建销毁之前");
  },
  destroyed() {
    console.log("组建销毁");
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  min-width: 960px;
}

.top-right {
  width: 40rem;
  right: 2%;
  top: 1rem;
}
.mute {
  width: 5rem;
}
.close {
  height: 2.25rem;
  width: 2.17rem;
}
.router {
  /* margin-top: 0; */
  width: 94.5%;
  height: 82.41%;
  background-color: #fff;
  border-radius: 1rem;
}

.col-blue {
  color: #6196f9;
}

.item-time {
  position: absolute;
  top: 6%;
  left: 3%;
  z-index: 1;
}
.col-orange {
  color: #da6c65;
}
.col-green {
  color: #5ebe6c;
}
</style>
