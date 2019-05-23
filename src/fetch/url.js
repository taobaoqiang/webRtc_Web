const baseUrl = 'https://apijcdj.shyunhua.com/';
import axios from 'axios'
axios.defaults.timeout = 5000; //设置超时时间
axios.defaults.baseURL = baseUrl; //这是调用数据接口
axios.defaults.withCredentials = true;

let obj = {
    // 数据本地存储
    save: (key, item) => {
        window.localStorage.setItem(key, item)
    },
    // 数据本地存储
    get: (key) => {
        return    window.localStorage.getItem(key)
    },

    // 获取会议流程
    mettingFlow: (data) => {

        return axios.get('/Meeting_Flow', {
            params: data
        }).then(res => {
            return res.data
        }).catch(err => {
            return err
        })
    },

    // 签到确定按钮
    meetingSign : (data) => {

        return axios.get('/Meeting_Sign', {
            params: data
        }).then(res => {
            return res.data
        }).catch(err => {
            return err
        })
    },

    // 查看详情
    getUserInfo (data){

        console.log('点了嘛')
           return axios.get('/Meeting_UserInfo', {
               params: data
           }).then(res => {
               return res.data
           }).catch(err => {
               return err
           })
    } ,


}

export default obj