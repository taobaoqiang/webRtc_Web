<template>
  <div class="w100 h100 pad-top flex-center-warp box-border">

    <div class="router-first w20 h100 ov-auto box-border">
      <router-view name="left"></router-view>
    </div>
    <div class="router-two  w40 h100 ov-auto box-border">
      <router-view name="center"></router-view>
    </div>
    <div class="w40  h100 router-three ov-auto ">
      <router-view name="right"></router-view>
    </div>

  </div>
</template>

<script>
export default {
  name: "home",
  components: {
    // HelloWorld
  },
  data() {
    return {
      loginId: "25646"
    };
  },
  created() {},
  mounted() {

  },
  destroyed() {
    // window.onbeforeunload = null;
  }
};
</script>
<style scoped>
.router-first {
  /* background-color: rgb(108, 173, 108); */
}
.router-two {
  /* background-color: rgb(105, 154, 182); */
}
.router-three {
  /* background-color: rgb(196, 125, 59); */
}
.pad-top {
  padding-top: 4rem;
  padding-bottom: 4rem;
}
</style>

