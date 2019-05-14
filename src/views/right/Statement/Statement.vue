<template>
  <div v-html="content">

  </div>
</template>
<script>
import axios from ".././../../fetch/url";

export default {
  data() {
    return {
      content: ""
    };
  },
  created() {
    
    this.init();
  },
  mounted() {},
  methods: {
    async init() {
      let data = {
        meeting_id: this.meeting_id,
        flow_step: this.$route.query.flow_step
      };

      let res = await axios.mettingFlow(data);
      this.content = res.data.data[0].flow_content;
    }
  }
};
</script>

<style scopedSlots>
</style>


