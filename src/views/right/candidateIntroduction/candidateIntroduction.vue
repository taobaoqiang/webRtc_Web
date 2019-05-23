

<template>
  <div class="flex-center-warp ">

    <div class="w90">
      <p class="t-l fz-4rem fw-700 tip">候选人介绍</p>
    </div>
    <div class="w100 flex-around-warp-el pr">
      <info
        v-show="flag"
        ref="userInfo"
        class="info"
        :style="styles"
        :userData="userInfo"
        v-on:closeFn="closeFn"
      ></info>

      <div
        class="flex-between w40 body cursor-pointer"
        v-for="(i,index) in data"
        :key="index"
        @click="getUserInfo(i.id)"
      >
        <div class="flex-between">
          <!-- <img
            class="imgs"
            :src="Boolean(i.image) ? i.image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3467405882,2227001058&fm=26&gp=0.jpg'"
            alt=""
          > -->
          <p
            v-if="i.sex == 1"
            class="fz-2rem name flex-center co-ff fw-700"
          >{{i.name.substr(0,1)}}</p>
          <p
            v-else
            class="fz-2rem name-fmal flex-center co-ff fw-700"
          >{{i.name.substr(0,1)}}</p>
        </div>
        <div class="flex-left">
          <p class="fz-2rem fw-700">{{i.name}} <span class="fz-15rem co-99">{{i.age + '岁'}}</span></p>

          <p
            v-if="index === 0"
            class="fz-15rem"
          ><span class="fz-2rem fw-700 co-59F">书记&nbsp;: </span><span class="co-99">(候选职位)</span></p>
          <p
            v-else-if="index ===1"
            class="fz-15rem"
          ><span class="fz-2rem fw-700 co-59F">副书记&nbsp;: </span><span class="co-99">(候选职位)</span></p>
          <p
            v-else
            class="fz-15rem"
          ><span class="fz-2rem fw-700 co-59F">委员&nbsp;: </span><span class="co-99">(候选职位)</span></p>

          <!-- <div class="view flex-between "> -->
          <!-- <P class="fz-15rem  co-ff">查看详情</P> -->
          <!-- <span class="fw-700 fz-15rem co-ff">></span> -->
          <img
            class="img-row"
            src="../../../../public/assets/detail.png"
            alt=""
          >
          <!-- </div> -->
        </div>

        <div
          class="flex-item-top mal"
          v-if="i.sex === 1"
        >
          <img
            class="img-sex"
            src="../../../../public/assets/sex_icon01.png"
            alt="性别"
          >
        </div>
        <div
          class="flex-item-top fmal"
          v-else
        >
          <img
            class="img-sex"
            src="../../../../public/assets/sex_icon02.png"
            alt="性别"
          >
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import fetch from "../../../fetch/url";
import info from "../../../components/user_info";
import sort from "../../../meetingJson";
export default {
  components: {
    info
  },
  data() {
    return {
      data: "",
      userInfo: "",
      styles: "",
      flag: false
    };
  },
  // created() {

  //   let tmr = setInterval(() => {

  //     if (this.$store.state.meeting_status) {

  //       window.clearInterval(tmr);
  //       this.init(this.$store.state.meeting_status);
  //     }

  //   }, 10);

  // },
  mounted() {
    this.init(this.$store.state.meeting_status);
  },
  computed: {
    states() {
      return this.$store.state.meeting_status;
    }
  },
  watch: {
    states(data) {
      this.init(data);
    },
    deep: true
  },
  methods: {
    // 初始化
    async init(r) {
      let a = r.secretary,
        b = r.deputy_secretary,
        c = r.commissioner;
      let tmp = [a, b, ...c];

      tmp = await tmp.map(el => {
        el.age = el.birth
          ? new Date().getFullYear() - el.birth.substr(0, 4)
          : 0;
        return el;
      });

      // // 按年龄排序
      console.log(tmp);
      this.data = tmp.sort(sort.scort("age"));
    },
    // 查看人员详情
    async getUserInfo(id) {
      this.flag = false;
      this.getFixd(event);
      let data = {
        user_id: id,
        meeting_id: this.meeting_id
      };
      let res = await fetch.getUserInfo(data);
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
      let el = this.$refs.userInfo;
      let str =
        "position: absolute;top :" +
        +(e.layerY + 20) +
        "px; left:" +
        (e.layerX + 20) +
        "px";

      // 设置样式
      this.styles = str;
    },
    closeFn() {
      this.flag = false;
    }
  }
};
</script>
<style scoped>
.imgs {
  width: 5rem;
  height: 5rem;
  border-radius: 4rem;
}
.body {
  box-shadow: 0 0 5px #cecece;
  margin: 5px 5px;
  border-radius: 5px;
  padding: 0.8rem 0 0.8rem 1.2rem;
}
.img-sex {
  width: 2rem;
  height: 2rem;
}
.tip {
  padding: 0 0 2rem 0;
}

.mal {
  padding: 0.5em 2em 0.5em 1em;
  border-radius: 2em 0 0 2em;
  background-color: #418afc;
}
.fmal {
  padding: 0.5em 2em 0.5em 1em;
  border-radius: 2em 0 0 2em;
  background-color: #e94648;
}
.info {
  /* position:absolute; */

  background-color: #fff;
  z-index: 9;
}

.view {
  border-radius: 5px;
  background-color: #418afc;
  padding: 0.5em 1em;
}

.img-row {
  /* height: 1em; */
  width: 70%;
}

.name {
  height: 5rem;
  width: 5rem;

  border-radius: 10rem;
  background-color: #418afc;
}
.name-fmal {
  height: 5rem;
  width: 5rem;
  border-radius: 10rem;

  background-color: #e94648;
}
</style>



