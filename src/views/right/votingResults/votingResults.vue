<template>
  <div class="flex-center-warp w100">

    <div class="w95">
      <p class="fz-4rem fw-700 t-l pad">投票结果</p>
      <div class='flex-start   co-99 w90 sp-pad'>
        <span>到会党员:</span> <span>{{party + '人'}}</span>
      </div>
      <div class="flex-start">
        <p
          @click="statusFn(0)"
          :class="csStatus === 0 ? 'ps-ago' : 'ps'"
        >书记</p>
        <p
          @click="statusFn(1)"
          :class="csStatus === 1 ? 'ps-ago' : 'ps'"
        >副书记</p>
        <p
          @click="statusFn(2)"
          :class="csStatus === 2 ? 'ps-ago' : 'ps'"
        >委员</p>

      </div>

    </div>

    <!-- 结果展示 -->
    <div
      class="w95 flex-between res"
      v-for="(el ,index) in data"
      :key="index"
    >

      <div>
        <p
          v-if="index === 0"
          class="ps01"
        >{{index+1}}</p>
        <p
          v-else-if="index === 1"
          class="ps02"
        >{{index+1}}</p>
        <p
          v-else
          class="ps03"
        >{{index+1}}</p>
      </div>

      <div
        class="m-l cursor-pointer"
        @click="getUserInfo(el.id)"
      >
        <!-- 
        <div>
          <span class="fz-2rem fw-700"> {{el.name.substr(0,1)}}</span>
        </div> -->

        <div class="b-info flex-between-clumn w90">
          <div class='flex-between w90 sp-pad'>

            <span class='fz-15rem fw-700'>{{el.name}}</span>
            <img
              class="img1"
              src='../../../../public/assets/sex_icon01.png'
            />
          </div>

        </div>

      </div>

      <div class="w65">

        <div class="flex-end">
          <span class="co-59F fz-15rem">{{el.gain}}</span><span class="co-99">&nbsp;/&nbsp;票</span>
        </div>
        <process
          :colors="colors"
          :ids="'top'+index"
          :rates="parseInt((100/(party)*el.gain))"
          class="process"
        ></process>
      </div>

    </div>

    <div class="info">

      <info
        v-show="flag"
        ref="userInfo"
        class="info"
        :style="styles"
        :userData="userInfo"
        v-on:closeFn="closeFn"
      ></info>
    </div>

  </div>

</template>
<script>
import process from "../../../components/process_com";
import fetch from "../../../fetch/url";
import info from "../../../components/user_info";
import scort from "../../../meetingJson";
export default {
  components: { process, info },
  data() {
    return {
      csStatus: 0,
      colors: "#e15244",
      userInfo: "",
      data: [],
      party: "",
      flag: false
    };
  },
  watch: {
    apply: function(ne, ol) {
      this.party = ne.party_number;
      this.statusFn(0);
    }
  },

  computed: {
    apply() {
      return this.$store.state.meeting_status;
    }
  },
  mounted() {
    this.party = this.$store.state.meeting_status.party_number;

    this.statusFn(0);
  },
  // created() {

  // },

  methods: {
    // 查看人员详情
    async getUserInfo(id) {
      this.flag = false;
      this.getFixd(event);
      let data = {
        user_id: id,
        meeting_id: this.meeting_id
      };

      let res = await fetch.getUserInfo(data);
      console.log(res.data.data);
      if (res.data.data.length) {
        this.userInfo = res.data.data;
      } else {
        this.userInfo = [
          {
            introduction: "暂无详情"
          }
        ];
      }

      this.flag = true;
    },

    // 详情展示定位
    getFixd(e) {
      console.log(e);
      let el = this.$refs.userInfo;
      let str =
        "position: absolute;top :" +
        +(e.clientY + 20) +
        "px; left:" +
        (e.clientX + 20) +
        "px";

      // 设置样式
      this.styles = str;
    },

    closeFn() {
      this.flag = false;
    },

    statusFn(a) {
      let data = this.$store.state.meeting_status;
      switch (a) {
        case 0:
          this.csStatus = a;
          this.data = data.secretary_gain.sort(scort.scort("gain"));

          break;

        case 1:
          this.csStatus = a;
          this.data = data.deputy_secretary_gain.sort(scort.scort("gain"));

          break;

        case 2:
          this.csStatus = a;
          this.data = data.commissioner_gain.sort(scort.scort("gain"));

          break;

        default:
          break;
      }
    }
  }
};
</script>
<style scoped>
.ps {
  margin: 0 2rem 0 0;
  padding: 1em 4em;
  color: #509ffe;
  border: 1px solid #509ffe;
  border-radius: 100rem;
  cursor: pointer;
}
.ps-ago {
  margin: 0 2rem 0 0;
  padding: 1em 4em;
  color: #fff;
  background-color: #509ffe;
  border: 1px solid #509ffe;
  border-radius: 100rem;
  cursor: pointer;
}

.pad {
  padding: 1rem 0;
}
.img {
  width: 6rem;
  height: 6rem;
  border-radius: 100%;
}

.img1 {
  width: 2rem;
  height: 2rem;
}

.ps01 {
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 0 10rem 10rem 0;
  background-color: #e15244;
}
.ps02 {
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 0 10rem 10rem 0;
  background-color: #f28a27;
}
.ps03 {
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 0 10rem 10rem 0;
  background-color: #ccc;
}
.m-l {
  margin-left: 0.5rem;
}

.b-info {
  margin: 0 2rem;
}

.sp-pad {
  padding: 0.2em 0;
}

.process {
  height: 2em;
  margin-right: -2rem;
}

.res {
  margin: 2rem 0;
  padding: 0.5rem 0.5rem 0.5rem 0;
  box-shadow: 0 0 5px #ccc;
  border-radius: 2px;
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
.flex-start {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
}

.info {
  background-color: #fff;
  max-width: 380px;
  max-height: 240px;
  overflow: auto;
}
</style>

