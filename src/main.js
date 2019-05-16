import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../public/assets/normalize.css'
import '../public/assets/main.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './config'






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