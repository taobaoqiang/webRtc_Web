import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../public/assets/normalize.css'
import '../public/assets/main.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Echarts from "echarts";

function getQueryVariable(variable) {
  var query = window.location.hash.substring(1);
  var vars = query.split("?");

  vars = vars[1].split('&')

  // 重置console.log()

  //  if (!global.consoleSwitch) {
  //    console.log = () => {}
  //  }

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {

      return pair[1];
    }
  }
  return (false);

}
let meeting_id = ""
let host_id = ""

if (window.localStorage.getItem('meeting_id') !== getQueryVariable("meeting_id") && getQueryVariable("meeting_id")) {
  meeting_id = getQueryVariable("meeting_id")
  window.localStorage.setItem('meeting_id', getQueryVariable("meeting_id"));


} else {
  meeting_id = window.localStorage.getItem('meeting_id');

}
if (window.localStorage.getItem('host_id') !== getQueryVariable("host_id") && getQueryVariable("host_id")) {
  host_id = getQueryVariable("host_id")
  window.localStorage.setItem('host_id', getQueryVariable("host_id"));


} else {
  host_id = window.localStorage.getItem('host_id');

}





var socket = new WebSocket('wss://apijcdj.shyunhua.com:1234?meet_commit=' + meeting_id);

let tmpsco = ""
Vue.prototype.$ws = socket;
Vue.prototype.host_id = host_id; //主持人id
Vue.prototype.meeting_id = meeting_id; //会议id
Vue.prototype.Echarts = Echarts;
socket.onopen = function () {

  socket.send(
    JSON.stringify({
      meeting_id: meeting_id,
      compere_id: host_id
    })
  );

  socket.onmessage = res => {


    if (res.data !== '连接成功') {


      if (tmpsco !== res.data) {
        tmpsco = res.data
        store.commit('meet_commit', JSON.parse(res.data))
      }
    }
  };
};




import '../public/assets/high_charts/highcharts-more'
import '../public/assets/high_charts/solid-gauge'

// 注册组件后即可使用

Vue.config.productionTip = false

// 生产打包 取消vue所有警告
Vue.config.silent = true
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')