

<template>
  <div class="flex-center-warp">

    <div class="w90">
      <p class="t-l fz-4rem fw-700 tip">候选人介绍</p>
    </div>
    <div class="w100 flex-center-warp">
      <div
        class="flex-between w90 body"
        v-for="(i,index) in data"
        :key="index"
      >
        <div class="flex-between w50">
          <img
            class="imgs"
            :src="Boolean(i.image) ? i.image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3467405882,2227001058&fm=26&gp=0.jpg'"
            alt=""
          >

          <p class="fz-2rem fw-700">{{i.name}}</p>
          <img
            v-if="i.sex === 1"
            class="img-sex"
            src="../../../../public/assets/sex_icon01.png"
            alt="性别"
          >
          <img
            v-else
            class="img-sex"
            src="../../../../public/assets/sex_icon02.png"
            alt="性别"
          >

          <p class="fz-15rem co-99">{{new Date().getFullYear()-( i.birth ? i.birth.substr(0,4) : new Date().getFullYear()) + '岁'}}</p>
        </div>
        <div class="flex-end w35">
          <p
            v-if="index === 0"
            class="fz-15rem"
          >候选职位&nbsp;:<span class="fz-2rem fw-700 co-59F">&nbsp;书记&nbsp;</span></p>
          <p
            v-else-if="index ===1"
            class="fz-15rem"
          >候选职位&nbsp;:<span class="fz-2rem fw-700 co-59F">&nbsp;副书记&nbsp;</span></p>
          <p
            v-else
            class="fz-15rem"
          >候选职位&nbsp;:<span class="fz-2rem fw-700 co-59F">&nbsp;委员&nbsp;</span></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: ""
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
    init(r) {
      let a = r.secretary,
        b = r.deputy_secretary,
        c = r.commissioner;
      this.data = [a, b, ...c];
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
  padding: 0.8rem 1.2rem;
}
.img-sex {
  width: 2rem;
  height: 2rem;
}
.tip {
  padding: 0 0 2rem 0;
}
</style>



