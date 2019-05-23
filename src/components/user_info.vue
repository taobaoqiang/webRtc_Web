<template>
  <div class="card flex-left">
      <img src="../../public/assets/close_fn.png" class="fz-2rem span" @click="closeSelf"/>
    <div
      v-for="(el,index) in userData"
      :key="index"
    >
      <img
        class="img"
        :src="imgSrc +el.user_image"
        alt=""
      >
      <div v-html="el.introduction">

      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["userData"],
  data() {
    return {};
  },
  methods: {
      closeSelf (){
          this.$emit('closeFn')
      }
  },
};
</script>

<style lang="css" scoped>
.img {
  height: 5rem;
  width: 5rem;
  border-radius: 4rem;
}
.card {
  box-shadow: 0 0 5px #cecece;
  padding: 1rem 2rem;
}
.span {
    cursor: pointer;
   position: absolute;
   top: 0;
   right: 0;
   height: 1.5em;
   width: 1.5em;
}
</style>