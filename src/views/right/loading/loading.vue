<template>
  <div class="fw-700 body">
    <div v-if="stop">
      <p class="co-8 fz-2rem">欢迎参加<span class="fz-3rem co-span">{{meeting}}</span>会议</p>
      <p class="co-blue fz-2rem">议程<span class="co-span fz-3rem">{{next}}</span>即将开始</p>
    </div>

    <div v-else>
      <p class="co-blue fz-2rem">会议结束 ! ! ! </p>
    </div>
  </div>
</template>
<script>
import list from "../../../meetingJson";
export default {
  data() {
    return {
      meeting: "",
      next: "",
      stop: true
      // infoObj: [
      //   {
      //     name: "张三",
      //     sex: "female",
      //     age: 223
      //   },
      //   {
      //     name: "李四",
      //     sex: "male",
      //     age: 133
      //   },
      //   {
      //     name: "王五",
      //     sex: "female",
      //     age: 211
      //   }
      // ]
    };
  },
  computed: {
    states() {
      return this.$store.state.meeting_status;
    }
  },
  watch: {
    states(ne) {
      let data = this.$route.query.flow_step;
      if (data == list.list.length && ne.data[data - 1].status == 3) {
        this.stop = false;
      } else {
        this.next = list.list[data - 1].name;
        this.meeting = ne.meeting_name;
      }
    }
  },
  mounted() {
    // this.scort();
    this.init();
  },
  methods: {
    init() {
      
      if (!this.$store.state.meeting_status.data.length) return;
      let data = this.$route.query.flow_step;

      if (
        data == list.list.length &&
        this.$store.state.meeting_status.data[data - 1].status === 3
      ) {
        this.stop = false;
      } else {
        this.next = list.list[data - 1].name;
        this.meeting = this.states.meeting_name;
      }
    }
    // 指定排序的比较函数
    // compare(property) {
    //   return function(obj1, obj2) {
    //     var value1 = obj1[property];
    //     var value2 = obj2[property];
    //     return value1 - value2; // 升序
    //   };
    // },
    // scort() {
    //   this.infoObj.sort(this.compare("age"));
    //   console.log(this.infoObj);
    // }
  }
};
</script> 
<style lang="css" scoped>
.co-8 {
  color: #008000;
}
.co-span {
  color: #d8531a;
  padding: 0 5px;
}

.co-blue {
  color: #418afb;
}
.body {
  letter-spacing: 0.3em;
  margin-top: 25%;
}
p {
  margin-top: 2em;
  text-align: center;
}
</style>