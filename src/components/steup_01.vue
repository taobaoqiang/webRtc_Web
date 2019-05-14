<template>
  <div>
    <div class="w95 items">
      <ul class="w100 flex-start">
        <li
          v-for="(el,index) in tableData"
          :key="index"
          class="lis"
        > <span class="sps">{{index +1}}</span><span>{{el.name}}</span></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "sign",
  props: ["tableData"],
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>


.items {
  margin: 0 auto;
}

.lis {
  padding: 1em 2.5em;
  margin: 5px 10px;
  border-radius: 5px;
  color: #178d22b3;
  background-color: #dcdcdc;
}
.sps {
  padding:0 0.5em 0 0;
}
</style>
