<template>
  <div>
    <ul class="flex-center-warp">
      <li
        v-for="(i,index) in list"
        :key="index"
        class="w95 flex-around lis"
      >
        <div class="flex-start w70">
          <img
            class="icon"
            :src="i.src"
            alt=""
          >

          <div class="mg-l-5">
            <p class="fz-2rem co-12 t-l fw-700">{{i.name}}</p>
            <p class="fz-133 co-99 t-l pad">{{i.present}}</p>
          </div>
        </div>
        <div>
          <div class="flex-around">

            <a :title="titleFn(i,index)">
              <img
                :src="i.stempSrc"
                :class="i.stempSrcFlag ? 'icon' : 'icon disableds'"
                @click="confirm(index,i.stempSrcFlag)"
              >
            </a>

          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { clearInterval } from "timers";
import list from "../../meetingJson";
export default {
  data() {
    return {
      router: ["/voteCount"],
      /**
       * 0 当前 开始
       * 1 当前结束
       * 2 下一步开始
       * 3 默认开始之前
       * 4 默认结束
       * 5 下一步结束
       */
      imgList: [
        require("../../../public/assets/image/icon09.png"),
        require("../../../public/assets/image/next.gif"),
        require("../../../public/assets/image/结束按钮@2x.png"),
        require("../../../public//assets//image/开始按钮@2x_n.png")
      ],

      list: list.list
    };
  },

  computed: {
    states() {
      // this.recover(this.$store.state.meeting_status.data)

      return this.$store.state.meeting_status.data;
    }
  },

  watch: {
    states(ne) {
      this.recover(ne);
    }
  },
  methods: {
    // 刷新状态恢复
    recover(data) {
      data.forEach((el, index, arr) => {
        // 状态（1 未开始 2 正在进行 3已结束）
        this.controlProcessStart(el.status, index, false);
      });
    },

    //路由控制
    routerFn(index) {
      let p = this.list[index].router;
      let q = { flow_step: this.list[index].flow_step };
      this.$router.push({
        path: p,
        query: q
      });
    },

    // 开始流程控制 type=false 刷新页面 type=true手动操作
    controlProcessStart(status, index, type) {
      switch (status) {
        case 1:
          if (index !== 0) {
            this.list[index].stempSrcFlag = false;

            this.list[index].stempSrc = this.imgList[0];

            if (type) {
              this.statusBus(2, index);
            }
          } else {
            this.routerLoading(index);

            if (type) {
              this.startTime();
              this.statusBus(2, index);
            }
          }

          break;
        case 2:
          this.list[index].stempSrc = this.imgList[1];
          this.list[index].stempSrcFlag = true;
          this.routerFn(index);

          if (type) {
            this.statusBus(3, index);
          }

          break;
        case 3:
          this.list[index].stempSrc = this.imgList[2];
          this.list[index].stempSrcFlag = false;

          if (index == this.list.length - 1) {
            this.routerLoading(index);
          }

          break;
        case 4:
          this.list[index].stempSrc = this.imgList[3];
          this.list[index].stempSrcFlag = true;
          // 带开始按钮
          if (type) this.statusBus(2, index);
          this.routerLoading(index);
          break;

        default:
          break;
      }
    },

    // 中间缓冲页面Loading
    routerLoading(index) {
      let q = { flow_step: this.list[index].flow_step };
      this.$router.push({
        path: "/loading",
        query: q
      });
    },

    // 会议开始时间
    startTime() {
      let { Y, M, D, h, m, s } = list.dateFormate(new Date());
      let tmp = Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
      let data = JSON.stringify({
        meeting_id: this.meeting_id,
        start_time: tmp,
        compere_id: this.host_id
      });
      // 发送数据
      this.$ws.send(data);
    },
    // 状态更改通知
    statusBus(status, index) {
      let data = JSON.stringify({
        meeting_id: this.meeting_id,
        flow_step: index + 1,
        status: status,

        compere_id: this.host_id
      });
      // 发送数据
      this.$ws.send(data);
    },

    // 判断是否可以执行下一步

    nextFn(index, flag) {
      let state = this.$store.state.meeting_status;

      // 签到低于百分之八十 不允许进行下一步流程
      if (index === 0 && state.data[0].status == 2) {
        let party = state.required,
          sign = state.sign_number;

        if (sign / party < 0.8) {
          this.$message({
            message: "签到人数低于80% 无法进行下一步",
            type: "warning"
          });
          return true;
        }
      }
      // 九言禁确认阅读人数低于百分之八十禁止进行下一步

      if (index === 1 && state.data[1].status == 2) {
        let party = state.sign_number,
          sign = state.confirm;

        if (sign / party < 0.8) {
          this.$message({
            message: "确认阅读人数低于80% 无法进行下一步",
            type: "warning"
          });
          return true;
        }
      }

      // 投票人低于百分之八十 不允许进行下一步开始
      if (index === 7 && state.data[7].status == 2) {
        let party = state.sign_number,
          sign = state.vote_number;

        if (sign / party < 0.8) {
          this.$message({
            message: "投票人数低于80% 无法进行下一步",
            type: "warning"
          });
          return true;
        }
      }
      return false;
    },

    // 悬浮提示
    titleFn(el, index) {
      let states = this.$store.state.meeting_status.data;
      if (states[index].status == 2) {
        return el.name + "正在进行中";
      }
      if (states[index].status == 4) {
        return el.name + "待开始";
      }
      return false;
    },

    // 确定操作
    confirm(index, flag) {
      if (!flag) return true;
      if (this.nextFn(index)) return;

      let status = this.$store.state.meeting_status.data[index].status;
      this.$confirm("此操作不可恢复, 是否继续?", "提示 ! ! !", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.controlProcessStart(status, index, true);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    }
  }
};
</script>
<style scoped>
.lis {
  padding-bottom: 2rem;
}
.icon {
  width: 4rem;
  height: 4rem;
  cursor: pointer;
}

.pad {
  padding: 5px 0 0 0;
}
.item-start {
  align-self: flex-start;
}
</style>
