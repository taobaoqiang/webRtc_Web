import Vue from "vue"
import store from './store'
import Echarts from "echarts";
Vue.prototype.Echarts = Echarts;
Vue.prototype.imgSrc = 'https://file.shyunhua.com/';


function getQueryVariable(variable) {
    var query = window.location.hash.substring(1);
    var vars = query.split("?");

    vars = vars[1].split('&')

    // // 重置console.log()

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
if (window.localStorage.getItem('compere_id') !== getQueryVariable("compere_id") && getQueryVariable("compere_id")) {
    host_id = getQueryVariable("compere_id")
    window.localStorage.setItem('compere_id', getQueryVariable("compere_id"));


} else {
    host_id = window.localStorage.getItem('compere_id');

}


host_id = parseInt(host_id) + 100000000


var socket = new WebSocket('wss://apijcdj.shyunhua.com:1234?meet_commit=' + meeting_id);

let tmpsco = ""
Vue.prototype.$ws = socket;
Vue.prototype.host_id = host_id; //主持人id
Vue.prototype.meeting_id = meeting_id; //会议id
// Vue.prototype.Echarts = Echarts;
socket.onopen = function () {

    socket.send(
        JSON.stringify({
            meeting_id: meeting_id,
            compere_id: host_id
        })
    );

    socket.onmessage = res => {


        if (res.data !== '连接成功') {


            if ((tmpsco !== res.data) && res.data) {
                tmpsco = res.data

                let data = JSON.parse(res.data)
                data.compere_id = parseInt(data.compere_id) + 100000000;
                store.commit('meet_commit', data)
            }
        }
    };
};