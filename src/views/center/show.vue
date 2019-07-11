<template>
  <div class="flex-center-warp w100 h100">
    <div class="w95 flex-between-con bg-cc h40">

      <div
        class="w50 topVideo pr  h100"
        id="topVideo"
      >
        <a
          v-if="flag"
          title="点击开始直播"
        >
          <img
            @click="close"
            class="img-01"
            src="../../../public/assets/end_rtmp.png"
            alt=""
          >
        </a>
        <a
          v-else
          title="点击暂停直播"
        >
          <img
            @click="close"
            class="img-01"
            src="../../../public/assets/strat_rtmp.png"
            alt=""
          >
        </a>

        <!-- <a
          v-if='mcFlag'
          title="点击禁用音频"
        >
          <img
            @click="mcFn"
            class="img-02"
            src="../../../public/assets/mc_on.png"
            alt=""
          >
        </a> -->

        <!-- <a
          v-else
          title="点击启用音频"
        >
          <img
            @click="mcFn"
            class="img-02"
            src="../../../public/assets/mc.png"
            alt=""
          >
        </a> -->

      </div>
      <div
        id='remoteVideo'
        class="w50 remoteVideo h100"
      >

      </div>
    </div>

    <!-- <div class="flex-around w95 fz-2rem co-ff fw-700 table">
      <p>参会人</p>
      <p>10人</p>
    </div> -->
    <div class="w95 down ov-auto">

      <p class="speek co-ff fw-700">在线人列表</p>
      <ul class="flex-center-warp">
        <li
          v-for="(i,index) in states.upper"
          :key="index"
          class="flex-around w95 lis"
        >

          <div class="flex-center-warp">

            <img
              class="icon"
              :src=" Boolean(i.image)? i.image : require('../../../public/assets/image/icon @2x(2).png')"
              alt=""
            >
            <p class="co-12 name fz-15rem fw-700">{{i.name}}</p>

          </div>

          <div class="flex-center-warp">
            <div>
              <a title="下麦">
                <img
                  @click="stopRemoteStream(i.id)"
                  class="status"
                  src="../../../public/assets/close.png"
                  alt="断开视频
                "
                >
              </a>
            </div>

            <img
              class="mg-l-5"
              src="../../../public/assets/image/视频 (2)@2x.png"
              alt=""
            >
          </div>
        </li>
      </ul>

      <p class="speek co-ff fw-700">申请人列表</p>
      <ul class="flex-center-warp">
        <li
          v-for="(i,index) in states.apply"
          :key="index"
          class="flex-around w95 lis"
        >

          <div class="flex-center-warp">

            <img
              class="icon"
              :src=" Boolean(i.image)? i.image : require('../../../public/assets/image/icon @2x(2).png')"
              alt=""
            >
            <p class="co-12 name fz-15rem fw-700">{{i.name}}</p>

          </div>

          <div class="flex-center-warp">
            <div v-if="index === 0">
              <img
                class="status"
                src="../../../public/assets/array_01.png"
                alt=""
              >
              <a title="上麦">
                <img
                  @click="getRemoteStream(i.id,i.id)"
                  class="status"
                  src="../../../public/assets/speech.png"
                  alt=""
                >
              </a>
            </div>
            <div v-else-if="index === 1">
              <img
                class="status"
                src="../../../public/assets/array_02.png"
                alt=""
              >
              <a title="上麦">
                <img
                  @click="getRemoteStream(i.id,i.id)"
                  class="status"
                  src="../../../public/assets/speech.png"
                  alt=""
                >
              </a>
            </div>
            <div v-else-if="index === 2">
              <img
                class="status"
                src="../../../public/assets/array_03.png"
                alt=""
              >
              <a title="上麦">
                <img
                  @click="getRemoteStream(i.id,i.id)"
                  class="status"
                  src="../../../public/assets/speech.png"
                  alt=""
                >
              </a>
            </div>
            <div v-else>

              <a title="上麦">
                <img
                  @click="getRemoteStream(i.id,i.id)"
                  class="status"
                  src="../../../public/assets/speech.png"
                  alt=""
                >
              </a>
            </div>

            <img
              class="mg-l-5"
              src="../../../public/assets/image/视频 (2)@2x.png"
              alt=""
            >
          </div>
        </li>
      </ul>

    </div>
  </div>
</template>
<script>
import AgoraRTC from "agora-rtc-sdk";
// const  AgoraRTC = require("../../assets/web_rtc/AgoraRTCSDK-2.6.0.js");
export default {
  data() {
    return {
      // appId: "cdfad6ea2173410c9c36f1df1e9c6d72",

      appId: "a247df868d144f6dbe956114b4a242d4",
      localStream: "",
      hostId: 9528,
      uid: 2564,
      flag: true,
      watchFlag: true,
      mcFlag: false,
      publishUrl: "",
      states: "",
      config: {
        mode: "rtc",
        codec: "h264"
        // proxyServer: "YOUR NGINX PROXY SERVER IP",
        // turnServer: {
        //   turnServerURL: "YOUR TURNSERVER URL",
        //   username: "YOUR USERNAME",
        //   password: "YOUR PASSWORD",
        //   udpport: "THE UDP PORT YOU WANT TO ADD",
        //   tcpport: "THE TCP PORT YOU WANT TO ADD",
        //   forceturn: false
        // }
      },
      client: ""
    };
  },

  watch: {
    apply: function(ne, ol) {
      this.states = ne;

      // // this.pubLish();
      // // this.revover(ne);
      // // console.log("状态更新", ne);
      // if (this.watchFlag) {
      //   // 加入房间
      //   // this.addRoom(this.meeting_id, this.states.compere_id);
      //   this.watchFlag = false;
      // }
      // }
    }
  },

  computed: {
    apply() {
      return this.$store.state.meeting_status;
    }
  },

  mounted() {
    this.init();
    this.revover(this.$store.state.meeting_status);
  },
  methods: {
    // 刷新页面恢复
    revover(ne) {
      // 刷新页面恢复
      console.log("刷新页面恢复", ne, ne.upper, ne.compere_id);

      ne.upper.map(el => {
        console.log("哈哈哈哈", el.id, ne.compere_id);

        if (el.id == ne.compere_id) {
          let t = JSON.stringify({
            compere_id: this.host_id,
            downer: 1,
            user_id: this.host_id,
            meeting_id: this.meeting_id
          });

          this.$ws.send(t);
        }
      });
    },

    // 初始化
    init() {
      //
      console.log("流程初始化");
      this.clientFn();
      this.addRoom(this.meeting_id, this.host_id);
      // 播放本地视频
      this.localPlay();
      // this.pubLish()

      // 远端拉流
      this.initOn();

      this.getRemoteStream(this.uid, "", true);
    },

    // 初始刷监听

    initOn() {
      let _ = this;
      this.client.on("stream-added", function(evt) {
        // _.removeAllChild("remoteVideo");

        let stream = evt.stream;

        // 指定接受远端视频流
        // if (stream.getId() == id) {
        _.client.subscribe(stream, function(evt) {});
        // 播放远端啊视频流
        _.client.on("stream-subscribed", function(evt) {
          let stream = evt.stream;
          console.count("远端视频流新增 ");
          if (stream.isPlaying()) {
          } else {
            stream.play("remoteVideo");
          }

          let el = document.querySelector("#remoteVideo div");
          _.addClass(el);
        });
        // }
      });
    },

    // 创建client stream 实例
    clientFn() {
      this.client = AgoraRTC.createClient(this.config);
      this.localStream = this.localStreamInit();
    },

    //本地视频播放
    localPlay() {
      this.localStream.init(() => {
        this.localStream.play("topVideo");
        let el = document.querySelector("#topVideo div");
        this.addClass(el);
      });
    },

    // 加入房间
    async addRoom(data, hostId) {
      console.time("内部");
      this.client.init(this.appId, () => {
        this.client.join(null, data, hostId, res => {
          console.timeEnd("内部");
        });
      });
    },

    // 设置样式

    addClass(el) {
      el.style.top = 0;
      el.style.left = 0;
      el.querySelector("video").style.top = 0;
      el.querySelector("video").style.left = 0;
    },

    // 关闭本地视频流

    close() {
      if (this.flag) {
        // this.localStream.stop();
        this.pubLish();
        // this.localStream.close();
        this.flag = false;
      } else {
        this.flag = true;
        this.unpublish();
      }
    },

    // 确定操作
    confirm(callback) {
      this.$confirm("你确定要下线主持人嘛?", "提示 ! ! !", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(callback)
        .catch();
    },

    // 单独订阅远端麦克风
    mcFn(uid) {
      if (this.mcFlag) {
        // 禁用音轨
        this.localStream.muteAudio();
        this.mcFlag = false;
      } else {
        // 启用音频
        this.mcFlag = true;
        this.localStream.unmuteAudio();
      }
      // let t = JSON.stringify({
      //   down: 1,
      //   user_id: uid,
      //   meeting_id: this.meeting_id
      // });

      // this.stopRemoteStream(t,uid);
    },

    // 单独订阅远端视频
    videoFn() {
      let _ = this;

      if (_.mcFlag) {
        _.client.on(
          "stream-subscribed",
          { video: true, audio: false },
          function(evt) {
            var remoteStream = evt.stream;
            console.log("一订阅" + remoteStream.getId());
            remoteStream.play("remoteVideo");
          }
        );

        this.mcFlag = false;
      } else {
        this.mcFlag = true;
        _.client.on(
          "stream-subscribed",
          { video: true, audio: false },
          function(evt) {
            var remoteStream = evt.stream;
            console.log("一订阅" + remoteStream.getId());
            remoteStream.play("remoteVideo");
          }
        );
      }
    },

    // 清空子元素

    removeAllChild(id) {
      var div = document.getElementById(id);
      while (div.hasChildNodes()) {
        //当div下还存在子节点时 循环继续
        div.removeChild(div.firstChild);
      }
    },

    // 发布音视频流
    pubLish() {
      console.log("发布音视频流");
      // setTimeout(() => {
      this.client.publish(this.localStream, function(err) {
        console.log(err);
        console.log("推流失败");
      });

      this.client.on("stream-published", evt => {
        this.mcFlag = true;
        this.hostFn();
        console.log("推流成功", evt);
        this.flag = false;
      });

      // }, 1000);
    },

    unpublish() {
      this.client.unpublish(this.localStream, err => {
        console.log("取消推送成功");
      });
      let t = JSON.stringify({
        compere_id: this.host_id,
        downer: 1,
        user_id: this.host_id,
        meeting_id: this.meeting_id
      });
      this.mcFlag = false;

      this.$ws.send(t);
      this.flag = true;
    },

    // 主持人本地上线
    hostFn() {
      let t = JSON.stringify({
        compere_id: this.host_id,
        upper: 1,
        user_id: this.host_id,
        meeting_id: this.meeting_id
      });
      // debugger;

      this.$ws.send(t);
    },

    // 检测在线人数

    upperFn() {
      console.log("检测在线人数");

      let num = this.$store.state.meeting_status.upper.length;
      if (num >= 2) {
        debugger;
        this.$message({
          message: "请先下线,在上麦 目前最大在麦人数2人! ! !",
          type: "warning"
        });
        return true;
      }

      return false;
    },

    // 远端拉流 播放
    getRemoteStream(id, send, flag) {
      if (!flag) {
        let tmp = this.upperFn();
        if (tmp) {
          return true;
        }
      }

      console.count("远端id是多少", id);
      this.removeAllChild("remoteVideo");
      if (send) {
        this.uid = send;
        let t = JSON.stringify({
          compere_id: this.host_id,
          upper: 1,
          user_id: send,
          meeting_id: this.meeting_id
        });
        this.$ws.send(t);
      }
      let _ = this;
      // on 远端视频流新增
      this.client.on("stream-added", function(evt) {
        // _.removeAllChild("remoteVideo");
        _.removeAllChild("remoteVideo");

        let stream = evt.stream;
        // 指定接受远端视频流
        if (stream.getId() == id) {
          _.client.subscribe(stream, function(evt) {});
          // 播放远端啊视频流
          _.client.on("stream-subscribed", function(evt) {
            let stream = evt.stream;

            console.count("远端视频流新增 ");
            if (stream.isPlaying()) {
              console.log("暂停播放");
            } else {
              console.log("正在播放");
              this.playStram = stream;
              stream.play("remoteVideo");
            }

            let el = document.querySelector("#remoteVideo div");
            _.addClass(el);
          });
        }
      });
    },

    // 停止订阅远端视频
    stopRemoteStream(uid) {
      let _ = this;
      // 主持人下麦改变状态
      if (uid == this.states.compere_id) {
        this.confirm(() => {
          this.flag = true;
          this.client.unpublish(this.localStream, err => {
            console.log("取消推送成功");
          });
          this.mcFlag = false;
          console.log("取消推送失败");

          // 下麦操作
          let t = JSON.stringify({
            compere_id: this.host_id,
            downer: 1,
            user_id: this.states.compere_id,
            meeting_id: this.meeting_id
          });
          _.$ws.send(t);
        });
      } else {
        // 下麦操作
        this.removeAllChild("remoteVideo");

        let t = JSON.stringify({
          compere_id: this.host_id,
          downer: 1,
          user_id: uid,
          meeting_id: this.meeting_id
        });
        _.$ws.send(t);
      }

      // //     // 取消订阅
      // _.client.unsubscribe(this.playStram, function(err) {
      //   console.log(err);
      // });
    },

    localStreamInit() {
      // 创建音视频流
      return AgoraRTC.createStream({
        streamID: this.uid,
        audio: true,
        video: true,
        screen: false
      });
    },
    beforeDestroy() {
      let t = JSON.stringify({
        compere_id: this.host_id,
        downer: 1,
        user_id: uid,
        meeting_id: this.meeting_id
      });
      _.$ws.send(t);
      console.log("组件销毁前");
    },
    destroyed() {
      console.log("组建销毁");
    }
  }
};
</script>
<style scoped>
.down {
  /* background-color: orange;
  margin-top: 3rem; */
  /* padding-top: 2.5rem; */
  height: 50%;
}

.bg-cc {
  background-color: #ccc;
}
.table {
  margin-top: 2rem;
  background: #509fff;
  padding: 2rem 2.42rem 1.5rem 2.17rem;
  border-radius: 1rem;
}

.icon {
  width: 2rem;
  height: 2rem;
}
.lis {
  padding: 1rem;
  border-bottom: 1px dashed #e2e2e2;
}
.name {
  margin-left: 1em;
}
.item {
  /* box-sizing: border-box;
  width: 250px;
  height: 250px;
  color: #fff;
  background-color: #444;
  margin: 5px; */
}
.img-01 {
  position: absolute;
  bottom: 20px;
  left: 30%;
  z-index: 1;
  transform: translateX(-50%);
  cursor: pointer;
}
.img-02 {
  position: absolute;
  bottom: 20px;
  left: 70%;
  z-index: 1;
  transform: translateX(-50%);
}
.status {
  height: 2rem;
  width: 2rem;
  cursor: pointer;
}

.speek {
  padding: 1.5rem;
  background-color: #509fff;
}
</style>
